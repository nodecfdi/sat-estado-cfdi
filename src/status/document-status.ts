import { Status } from './enums/document-status';

class DocumentStatus {
    constructor(private readonly current: Status) {}

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

export { DocumentStatus };

export { Status as DocumentStatusEnum } from './enums/document-status';
