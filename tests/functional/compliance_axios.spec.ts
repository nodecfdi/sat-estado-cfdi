import { DiscoverExtractor } from '@nodecfdi/cfdi-expresiones';
import CfdiStatus from '#src/cfdi_status';
import { AxiosConsumerClient } from '#src/clients/axios_consumer_client';
import Consumer from '#src/consumer';
import {
  CancellableStatus,
  CancellationStatus,
  DocumentStatus,
  EfosStatus,
  QueryStatus,
} from '#src/index';

describe('compliance axios', () => {
  test('contact webservice with active cfdi', async () => {
    const expressionExtractor = new DiscoverExtractor();
    const expression = expressionExtractor.format(
      {
        re: 'POT9207213D6',
        rr: 'DIM8701081LA',
        tt: '2010.01',
        id: 'CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
        fe: '/OAgdg==',
      },
      'CFDI33',
    );

    const client = new AxiosConsumerClient();
    const consumer = new Consumer(client);
    const response = await consumer.execute(expression);

    const expected = CfdiStatus.fromEnumValues(
      QueryStatus.Found,
      DocumentStatus.Active,
      CancellableStatus.CancellableByApproval,
      CancellationStatus.Undefined,
      EfosStatus.Excluded,
      {
        CodigoEstatus: 'S - Comprobante obtenido satisfactoriamente.',
        EsCancelable: 'Cancelable con aceptación',
        Estado: 'Vigente',
        ValidacionEFOS: '200',
      },
    );

    assert.deepEqual(response.query, expected.query);
    assert.deepEqual(response.document, expected.document);
    assert.deepEqual(response.cancellable, expected.cancellable);
    assert.deepEqual(response.cancellation, expected.cancellation);
    assert.deepEqual(response.efos, expected.efos);
    assert.deepEqual(response.rawResponse, expected.rawResponse);
  }, 30000);

  test('contact webservice with cancelled cfdi', async () => {
    const expressionExtractor = new DiscoverExtractor();
    const expression = expressionExtractor.format(
      {
        re: 'DIM8701081LA',
        rr: 'XEXX010101000',
        tt: '8413.00',
        id: '3be40815-916c-4c91-84e2-6070d4bc3949',
        fe: '3f86Og==',
      },
      'CFDI33',
    );

    const client = new AxiosConsumerClient();
    const consumer = new Consumer(client);
    const response = await consumer.execute(expression);

    const expected = CfdiStatus.fromEnumValues(
      QueryStatus.Found,
      DocumentStatus.Cancelled,
      CancellableStatus.NotCancellable,
      CancellationStatus.Undefined,
      EfosStatus.Excluded,
      {
        CodigoEstatus: 'S - Comprobante obtenido satisfactoriamente.',
        Estado: 'Cancelado',
        ValidacionEFOS: '200',
      },
    );

    assert.deepEqual(response.query, expected.query);
    assert.deepEqual(response.document, expected.document);
    assert.deepEqual(response.cancellable, expected.cancellable);
    assert.deepEqual(response.cancellation, expected.cancellation);
    assert.deepEqual(response.efos, expected.efos);
    assert.deepEqual(response.rawResponse, expected.rawResponse);
  }, 30000);

  test('contact webservice with not found cfdi', async () => {
    const expressionExtractor = new DiscoverExtractor();
    const expression = expressionExtractor.format(
      {
        re: 'AAA010101AAA',
        rr: 'XEXX010101000',
        tt: '1.00',
        id: '01234567-89ab-cf01-2345-67890abcd012',
        fe: 'aaaaaa==',
      },
      'CFDI33',
    );

    const client = new AxiosConsumerClient();
    const consumer = new Consumer(client);
    const response = await consumer.execute(expression);

    const expected = CfdiStatus.fromEnumValues(
      QueryStatus.NotFound,
      DocumentStatus.NotFound,
      CancellableStatus.NotCancellable,
      CancellationStatus.Undefined,
      EfosStatus.Included,
      {
        CodigoEstatus: 'N - 602: Comprobante no encontrado.',
        Estado: 'No Encontrado',
      },
    );

    assert.deepEqual(response.query, expected.query);
    assert.deepEqual(response.document, expected.document);
    assert.deepEqual(response.cancellable, expected.cancellable);
    assert.deepEqual(response.cancellation, expected.cancellation);
    assert.deepEqual(response.efos, expected.efos);
    assert.deepEqual(response.rawResponse, expected.rawResponse);
  }, 30000);
});
