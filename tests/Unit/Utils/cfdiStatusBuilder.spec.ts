import CfdiStatusBuilder from '../../../src/Utils/cfdiStatusBuilder';
describe('Cfdi status Builder   ', () => {
  it('Create using empty response', () => {
    const builder = new CfdiStatusBuilder('', '', '', '', '');
    builder.create();
    expect(builder.queryStatusIsNotFound()).toBe(true);
    expect(builder.documentStatusIsNotFound()).toBe(true);
    expect(builder.documentStatusIsNotFound()).toBe(true);
    expect(builder.cancellableStatusNotCancellable()).toBe(true);
    expect(builder.cancellationStatusIsUndefined()).toBe(true);
    expect(builder.efosStatusIsIncluded()).toBe(true);
  });

  it('Create Using Request Different Than Found', () => {
    const builder = new CfdiStatusBuilder('foo', '', '', '', '');
    builder.create();
    expect(builder.queryStatusIsNotFound()).toBe(true);
  });

  it('Create Using Request Found', () => {
    const builder = new CfdiStatusBuilder('S - ...', '', '', '', '');
    builder.create();
    expect(builder.queryStatusIsFound()).toBe(true);
  });

  it('Create Using Active is Active', () => {
    const builder = new CfdiStatusBuilder('', 'Vigente', '', '', '');
    builder.create();
    expect(builder.documentStatusIsActive()).toBe(true);
  });

  it('Create Using Active Is Cancelled', () => {
    const builder = new CfdiStatusBuilder('', 'Cancelado', '', '', '');
    builder.create();
    expect(builder.documentStatusIsCanceled()).toBe(true);
  });

  it('Create Using Active Any Other Value', () => {
    const builder = new CfdiStatusBuilder('', '', '', '', '');
    builder.create();
    expect(builder.documentStatusIsNotFound()).toBe(true);
  });

  it('Create Using Cancellable Is Direct Method', () => {
    const builder = new CfdiStatusBuilder('', '', 'Cancelable sin aceptación', '', '');
    builder.create();
    expect(builder.cancellableStatusByDirectCall()).toBe(true);
  });

  it('Create Using Cancellable Is Request Method', () => {
    const builder = new CfdiStatusBuilder('', '', 'Cancelable con aceptación', '', '');
    builder.create();
    expect(builder.cancellableStatusByApproval()).toBe(true);
  });
  it.each(['No cancelable', 'foo', ''])('CreateUsingCancellableNotCancellable', (input: string) => {
    const builder = new CfdiStatusBuilder('', '', input, '', '');
    expect(builder.cancellableStatusNotCancellable()).toBe(true);
  }); 
  it('Create Using Cancellation Is Pending', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'En proceso', '');
    builder.create();
    expect(builder.cancellationStatusIsPending()).toBe(true);
  });

  it('Create Using Cancellation Is Canceled By Request', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Cancelado con aceptación', '');
    builder.create();
    expect(builder.cancellationStatusIsCancelledByApproval()).toBe(true);
  }); 

  it('Create Using Cancellation Is Cancel By Timeout', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Plazo vencido', '');
    builder.create();
    expect(builder.cancellationStatusIsCancelledByExpiration()).toBe(true);
  }); 

  it('Create Using Cancellation Is Cancel Direct', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Cancelado sin aceptación', '');
    builder.create();
    expect(builder.cancellationStatusIsCancelledByDirectCall()).toBe(true);
  });
  it('Create Using Cancellation Is Rejected', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Solicitud rechazada', '');
    builder.create();
    expect(builder.cancellationStatusIsDisapprved()).toBe(true);
  });

  it.each(['', 'foo'])('Create Using Cancellation Any Other Value', (input: string) => {
    const builder = new CfdiStatusBuilder('', '', '', input, '');
    expect(builder.cancellationStatusIsUndefined()).toBe(true);
  });

  it.each(['', '100', '199', '201', 'other' ])('Create Using Validacion Efos Included', (input: string) => {
    const builder = new CfdiStatusBuilder('', '', '', '', input);
    expect(builder.efosStatusIsIncluded()).toBe(true);
  });

  it('Create Using Validacion Efos Excluded', () => {
    const builder = new CfdiStatusBuilder('', '', '', '', '200');
    builder.create();
    expect(builder.efosStatusIsExcluded()).toBe(true);
  });
});
