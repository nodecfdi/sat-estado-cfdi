import { Status } from './enums/document-status';

class DocumentStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isActive(): boolean {
        return this.current === Status.Active;
    }

    public isCancelled(): boolean {
        return this.current === Status.Canceled;
    }

    public isNotFound(): boolean {
        return this.current === Status.NotFound;
    }
}

export { DocumentStatus, Status as DocumentStatusEnum };
