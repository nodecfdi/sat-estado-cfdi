import CfdiStatusBuilder from '#src/utils/cfdi_status_builder';

describe('cfdi status builder', () => {
  test('create using empty response', () => {
    const builder = new CfdiStatusBuilder('', '', '', '', '', {});
    const response = builder.create();

    // Default states
    assert.isTrue(response.query.isNotFound());
    assert.isTrue(response.document.isNotFound());
    assert.isTrue(response.cancellable.isNotCancellable());
    assert.isTrue(response.cancellation.isUndefined());
    assert.isTrue(response.efos.isIncluded());
    assert.isEmpty(response.rawResponse);
  });

  test('create using request different than found', () => {
    const builder = new CfdiStatusBuilder('foo', '', '', '', '', {});

    assert.isTrue(builder.createQueryStatus().isNotFound());
  });

  test('create using request found', () => {
    const builder = new CfdiStatusBuilder('S - ...', '', '', '', '', {});

    assert.isTrue(builder.createQueryStatus().isFound());
  });

  test('create using active is active', () => {
    const builder = new CfdiStatusBuilder('', 'Vigente', '', '', '', {});

    assert.isTrue(builder.createDocumentStatus().isActive());
  });

  test('create using active is cancelled', () => {
    const builder = new CfdiStatusBuilder('', 'Cancelado', '', '', '', {});

    assert.isTrue(builder.createDocumentStatus().isCancelled());
  });

  test('create using active any other value', () => {
    const builder = new CfdiStatusBuilder('', 'any value', '', '', '', {});

    assert.isTrue(builder.createDocumentStatus().isNotFound());
  });

  test('create using cancellable is direct method', () => {
    const builder = new CfdiStatusBuilder('', '', 'Cancelable sin aceptación', '', '', {});

    assert.isTrue(builder.createCancellableStatus().isCancellableByDirectCall());
  });

  test('create using cancellable is request method', () => {
    const builder = new CfdiStatusBuilder('', '', 'Cancelable con aceptación', '', '', {});

    assert.isTrue(builder.createCancellableStatus().isCancellableByApproval());
  });

  test.each([['No cancelable'], ['foo'], ['']])(
    'create using cancellable not cancellable',
    (input) => {
      const builder = new CfdiStatusBuilder('', '', input, '', '', {});

      assert.isTrue(builder.createCancellableStatus().isNotCancellable());
    },
  );

  test('create using cancellation is pending', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'En proceso', '', {});

    assert.isTrue(builder.createCancellationStatus().isPending());
  });

  test('create using cancellation is cancel by request', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Cancelado con aceptación', '', {});

    assert.isTrue(builder.createCancellationStatus().isCancelledByApproval());
  });

  test('create using cancellation is cancel by timeout', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Plazo vencido', '', {});

    assert.isTrue(builder.createCancellationStatus().isCancelledByExpiration());
  });

  test('create using cancellation is cancel direct', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Cancelado sin aceptación', '', {});

    assert.isTrue(builder.createCancellationStatus().isCancelledByDirectCall());
  });

  test('create using cancellation is rejected', () => {
    const builder = new CfdiStatusBuilder('', '', '', 'Solicitud rechazada', '', {});

    assert.isTrue(builder.createCancellationStatus().isDisapproved());
  });

  test.each([[''], ['foo']])('create using cancellation any other value', (input) => {
    const builder = new CfdiStatusBuilder('', '', '', input, '', {});

    assert.isTrue(builder.createCancellationStatus().isUndefined());
  });

  test.each([[''], ['100'], ['199'], ['202'], ['other']])(
    'create using validacion efos included',
    (input) => {
      const builder = new CfdiStatusBuilder('', '', '', '', input, {});

      assert.isTrue(builder.createEfosStatus().isIncluded());
    },
  );

  test.each([['200'], ['201']])('create using validacion efos excluded', (input) => {
    const builder = new CfdiStatusBuilder('', '', '', '', input, {});

    assert.isTrue(builder.createEfosStatus().isExcluded());
  });
});
