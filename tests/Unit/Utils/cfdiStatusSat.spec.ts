import { CfdiStatus } from "../../../src/cfdiStatus";
import { CancellableStatus } from "../../../src/Status/cancellableStatus";
import { CancellationStatus } from "../../../src/Status/cancellationStatus";
import { DocumentStatus } from "../../../src/Status/documentStatus";
import { EfosStatus } from "../../../src/Status/efosStatus";
import { QueryStatus } from "../../../src/Status/queryStatus";

describe('Cfdi status sat', () => {
    it('Object Return Correct Properties', () => {
        const query = QueryStatus.found;
        const document = DocumentStatus.active;
        const cancellable = CancellableStatus.notCancellable;
        const cancellation = CancellationStatus.undefined;
        const efos = EfosStatus.excluded;
        const cfdiStatus = new CfdiStatus(query, document, cancellable, cancellation, efos);

        expect(query).toBe(cfdiStatus.getQuery());
        expect(document).toBe(cfdiStatus.getDocument());
        expect(cancellable).toBe(cfdiStatus.getCancellable());
        expect(cancellation).toBe(cfdiStatus.getCancellation());
        expect(efos).toBe(cfdiStatus.getEfos());
    });
  });
  