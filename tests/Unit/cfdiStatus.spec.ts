import { CfdiStatus } from '../../src/cfdiStatus';
import { CancellableStatus } from '../../src/Status/cancellableStatus';
import { CancellationStatus } from '../../src/Status/cancellationStatus';
import { DocumentStatus } from '../../src/Status/documentStatus';
import { EfosStatus } from '../../src/Status/efosStatus';
import { QueryStatus } from '../../src/Status/queryStatus';

describe('Cfdi status sat', () => {
  it('Object Return Correct Properties', () => {
    const query = new QueryStatus(QueryStatus.status.found);
    const document = new DocumentStatus(DocumentStatus.status.active);
    const cancellable = new CancellableStatus(CancellableStatus.status.notCancellable);
    const cancellation = new CancellationStatus(CancellationStatus.status.undefined);
    const efos = new EfosStatus(EfosStatus.status.excluded);
    const cfdiStatus = new CfdiStatus(
      QueryStatus.status.found,
      DocumentStatus.status.active,
      CancellableStatus.status.notCancellable,
      CancellationStatus.status.undefined,
      EfosStatus.status.excluded,
    );

    expect(query.isFound()).toBe(cfdiStatus.getQuery().isFound());
    expect(document.isActive()).toBe(cfdiStatus.getDocument().isActive());
    expect(cancellable.notCancellable()).toBe(cfdiStatus.getCancellable().notCancellable());
    expect(cancellation.isUndefined()).toBe(cfdiStatus.getCancellation().isUndefined());
    expect(efos.isExcluded()).toBe(cfdiStatus.getEfos().isExcluded());
  });
});
