import { CfdiStatus } from 'src/cfdi-status';
import { CancellableStatus, CancellableStatusEnum } from 'src/status/cancellable-status';
import { CancellationStatus, CancellationStatusEnum } from 'src/status/cancellation-status';
import { DocumentStatus, DocumentStatusEnum } from 'src/status/document-status';
import { EfosStatus, EfosStatusEnum } from 'src/status/efos-status';
import { QueryStatus, QueryStatusEnum } from 'src/status/query-status';

describe('Cfdi status sat', () => {
    it('Object Return Correct Properties', () => {
        const query = new QueryStatus(QueryStatusEnum.Found);
        const document = new DocumentStatus(DocumentStatusEnum.Active);
        const cancellable = new CancellableStatus(CancellableStatusEnum.NotCancellable);
        const cancellation = new CancellationStatus(CancellationStatusEnum.Undefined);
        const efos = new EfosStatus(EfosStatusEnum.Excluded);
        const cfdiStatus = new CfdiStatus(query, document, cancellable, cancellation, efos);

        expect(query.isFound()).toBe(cfdiStatus.getQuery().isFound());
        expect(document.isActive()).toBe(cfdiStatus.getDocument().isActive());
        expect(cancellable.notCancellable()).toBe(cfdiStatus.getCancellable().notCancellable());
        expect(cancellation.isUndefined()).toBe(cfdiStatus.getCancellation().isUndefined());
        expect(efos.isExcluded()).toBe(cfdiStatus.getEfos().isExcluded());
    });
});
