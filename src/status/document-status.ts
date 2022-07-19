import { Status } from './enums/document-status';

class DocumentStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isActive(): boolean {
        return this.current === Status.active;
    }

    public isCancelled(): boolean {
        return this.current === Status.canceled;
    }

    public isNotFound(): boolean {
        return this.current === Status.notFound;
    }
}

export { DocumentStatus, Status as DocumentStatusEnum };
