import { CancellableStatus } from './status/cancellable-status';
import { CancellationStatus } from './status/cancellation-status';
import { DocumentStatus } from './status/document-status';
import { EfosStatus } from './status/efos-status';
import { QueryStatus } from './status/query-status';

export class CfdiStatus {
    private query: QueryStatus;

    private document: DocumentStatus;

    private cancellable: CancellableStatus;

    private cancellation: CancellationStatus;

    private efos: EfosStatus;

    /**
     *
     */
    constructor(
        query: QueryStatus,
        document: DocumentStatus,
        cancellable: CancellableStatus,
        cancellation: CancellationStatus,
        efos: EfosStatus
    ) {
        this.query = query;
        this.document = document;
        this.cancellable = cancellable;
        this.cancellation = cancellation;
        this.efos = efos;
    }

    public getQuery(): QueryStatus {
        return this.query;
    }

    public getDocument(): DocumentStatus {
        return this.document;
    }

    public getCancellable(): CancellableStatus {
        return this.cancellable;
    }

    public getCancellation(): CancellationStatus {
        return this.cancellation;
    }

    public getEfos(): EfosStatus {
        return this.efos;
    }
}
