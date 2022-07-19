import { CfdiStatusBuilder } from '../../../src/utils/cfdi-status-builder';
describe('Cfdi status Builder', () => {
    it('Create using empty response', () => {
        const builder = new CfdiStatusBuilder('', '', '', '', '');
        const response = builder.create();
        expect(response.getQuery().isNotFound()).toBe(true);
        expect(response.getDocument().isNotFound()).toBe(true);
        expect(response.getCancellable().notCancellable()).toBe(true);
        expect(response.getCancellation().isUndefined()).toBe(true);
        expect(response.getEfos().isIncluded()).toBe(true);
    });

    it('Create Using Request Different Than Found', () => {
        const builder = new CfdiStatusBuilder('foo', '', '', '', '');
        const response = builder.create();
        expect(response.getQuery().isNotFound()).toBe(true);
    });

    it('Create Using Request Found', () => {
        const builder = new CfdiStatusBuilder('S - ...', '', '', '', '');
        const response = builder.create();
        expect(response.getQuery().isFound()).toBe(true);
    });

    it('Create Using Active is Active', () => {
        const builder = new CfdiStatusBuilder('', 'Vigente', '', '', '');
        const response = builder.create();
        expect(response.getDocument().isActive()).toBe(true);
    });

    it('Create Using Active Is Cancelled', () => {
        const builder = new CfdiStatusBuilder('', 'Cancelado', '', '', '');
        const response = builder.create();
        expect(response.getDocument().isCancelled()).toBe(true);
    });

    it('Create Using Active Any Other Value', () => {
        const builder = new CfdiStatusBuilder('', '', '', '', '');
        const response = builder.create();
        expect(response.getDocument().isNotFound()).toBe(true);
    });

    it('Create Using Cancellable Is Direct Method', () => {
        const builder = new CfdiStatusBuilder('', '', 'Cancelable sin aceptación', '', '');
        const response = builder.create();
        expect(response.getCancellable().cancellableByDirectCall()).toBe(true);
    });

    it('Create Using Cancellable Is Request Method', () => {
        const builder = new CfdiStatusBuilder('', '', 'Cancelable con aceptación', '', '');
        const response = builder.create();
        expect(response.getCancellable().cancellableByApproval()).toBe(true);
    });
    it.each(['No cancelable', 'foo', ''])('CreateUsingCancellableNotCancellable', (input: string) => {
        const builder = new CfdiStatusBuilder('', '', input, '', '');
        const response = builder.create();
        expect(response.getCancellable().notCancellable()).toBe(true);
    });
    it('Create Using Cancellation Is Pending', () => {
        const builder = new CfdiStatusBuilder('', '', '', 'En proceso', '');
        const response = builder.create();
        expect(response.getCancellation().isPending()).toBe(true);
    });

    it('Create Using Cancellation Is Canceled By Request', () => {
        const builder = new CfdiStatusBuilder('', '', '', 'Cancelado con aceptación', '');
        builder.create();
        const response = builder.create();
        expect(response.getCancellation().isCancelledByApproval()).toBe(true);
    });

    it('Create Using Cancellation Is Cancel By Timeout', () => {
        const builder = new CfdiStatusBuilder('', '', '', 'Plazo vencido', '');
        builder.create();
        const response = builder.create();
        expect(response.getCancellation().isCancelledByExpiration()).toBe(true);
    });

    it('Create Using Cancellation Is Cancel Direct', () => {
        const builder = new CfdiStatusBuilder('', '', '', 'Cancelado sin aceptación', '');
        builder.create();
        const response = builder.create();
        expect(response.getCancellation().isCancelledByDirectCall()).toBe(true);
    });
    it('Create Using Cancellation Is Rejected', () => {
        const builder = new CfdiStatusBuilder('', '', '', 'Solicitud rechazada', '');
        builder.create();
        const response = builder.create();
        expect(response.getCancellation().isDisapproved()).toBe(true);
    });

    it.each(['', 'foo'])('Create Using Cancellation Any Other Value', (input: string) => {
        const builder = new CfdiStatusBuilder('', '', '', input, '');
        const response = builder.create();
        expect(response.getCancellation().isUndefined()).toBe(true);
    });

    it.each(['', '100', '199', '201', 'other'])('Create Using Validacion Efos Included', (input: string) => {
        const builder = new CfdiStatusBuilder('', '', '', '', input);
        const response = builder.create();
        expect(response.getEfos().isIncluded()).toBe(true);
    });

    it('Create Using Validacion Efos Excluded', () => {
        const builder = new CfdiStatusBuilder('', '', '', '', '200');
        builder.create();
        const response = builder.create();
        expect(response.getEfos().isExcluded()).toBe(true);
    });
});
