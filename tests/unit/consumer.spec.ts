import Consumer from '#src/consumer';
import FakeConsumerClient from '../helpers/fake_consumer_client.js';

describe('consumer', () => {
  test('has same factory and uris as constructed', () => {
    const client = new FakeConsumerClient();
    const uri = 'https://example.com';
    const consumer = new Consumer(client, uri);

    assert.strictEqual(consumer.client, client);
    assert.strictEqual(consumer.uri, uri);
  });

  test('call consumer and get expected response status', async () => {
    const fakeInput = {
      CodigoEstatus: 'S - Comprobante obtenido satisfactoriamente.',
      Estado: 'Vigente',
      EsCancelable: 'Cancelable con aceptación',
      EstatusCancelacion: 'En proceso',
      ValidacionEFOS: '200',
    };
    const fakeExpression = 'foo-bar';
    const fakeClient = new FakeConsumerClient(fakeInput);

    const consumer = new Consumer(fakeClient);
    const response = await consumer.execute(fakeExpression);

    assert.isTrue(response.query.isFound());
    assert.isTrue(response.document.isActive());
    assert.isTrue(response.cancellable.isCancellableByApproval());
    assert.isTrue(response.cancellation.isPending());
    assert.isTrue(response.efos.isExcluded());
    assert.strictEqual(response.rawResponse, fakeInput);
  });
});
