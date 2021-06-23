import { FakeConsumerClient } from '../fakeConsumerClient';
import { Consumer } from '../../src/consumer';
import { QueryStatus } from '../../src/Status/queryStatus';
import { DocumentStatus } from '../../src/Status/documentStatus';
import { CancellableStatus } from '../../src/Status/cancellableStatus';
import { CancellationStatus } from '../../src/Status/cancellationStatus';

describe('Consumer test', () => {
  it('Has Same Factory And Uri As Constructed', () => {
    const client = new FakeConsumerClient({ '': '' });
    const uri = 'https://example.com';

    const consumer = new Consumer(client, uri);
    expect(client).toBe(consumer.getClient());
    expect(uri).toBe(consumer.getUri());
  });

  it('Call Consumer And Get Expected Response Status', () => {
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
    const response = consumer.execute(fakeExpression);
    expect(response.getQuery().isFound()).toBe(true);
    expect(response.getDocument().isActive()).toBe(true);
    expect(response.getCancellable().byApproval()).toBe(true);
    expect(response.getCancellation().isPending()).toBe(true);
    expect(response.getEfos().isExcluded()).toBe(true);
  });
});
