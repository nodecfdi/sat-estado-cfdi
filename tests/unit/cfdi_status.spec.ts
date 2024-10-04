import CfdiStatus from '#src/cfdi_status';
import CancellableStatus from '#src/status/cancellable_status';
import CancellationStatus from '#src/status/cancellation_status';
import DocumentStatus from '#src/status/document_status';
import EfosStatus from '#src/status/efos_status';
import QueryStatus from '#src/status/query_status';

describe('cfdi status', () => {
  test('object class return correct properties', () => {
    const query = new QueryStatus(QueryStatus.Found);
    const document = new DocumentStatus(DocumentStatus.Active);
    const cancellable = new CancellableStatus(CancellableStatus.NotCancellable);
    const cancellation = new CancellationStatus(CancellationStatus.Undefined);
    const efos = new EfosStatus(EfosStatus.Excluded);
    const rawResponse = { foo: 'bar' };
    const cfdiStatus = new CfdiStatus(
      query,
      document,
      cancellable,
      cancellation,
      efos,
      rawResponse,
    );

    assert.strictEqual(cfdiStatus.query, query);
    assert.strictEqual(cfdiStatus.document, document);
    assert.strictEqual(cfdiStatus.cancellable, cancellable);
    assert.strictEqual(cfdiStatus.cancellation, cancellation);
    assert.strictEqual(cfdiStatus.efos, efos);
    assert.strictEqual(cfdiStatus.rawResponse, rawResponse);
  });
});
