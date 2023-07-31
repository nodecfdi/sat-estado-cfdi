import { FakeConsumerClient } from '../fake-consumer-client';
import { Consumer } from 'src/consumer';

describe('Consumer test', () => {
    it('Has Same Factory And Uri As Constructed', () => {
        const client = new FakeConsumerClient({ '': '' });
        const uri = 'https://example.com';

        const consumer = new Consumer(client, uri);
        expect(client).toBe(consumer.getClient());
        expect(uri).toBe(consumer.getUri());
    });

    it('Call Consumer And Get Expected Response Status', async () => {
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
        const response = await consumer.executeAsync(fakeExpression);
        expect(response.getQuery().isFound()).toBe(true);
        expect(response.getDocument().isActive()).toBe(true);
        expect(response.getCancellable().cancellableByApproval()).toBe(true);
        expect(response.getCancellation().isPending()).toBe(true);
        expect(response.getEfos().isExcluded()).toBe(true);
        expect(response.getRawResponse()).toBe(fakeInput);
    }, 1000);
});
