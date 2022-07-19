import { Status } from './enums/cancellable-status';
class CancellableStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public cancellableByDirectCall(): boolean {
        return this.current === Status.cancellableByDirectCall;
    }

    public cancellableByApproval(): boolean {
        return this.current === Status.cancellableByApproval;
    }

    public notCancellable(): boolean {
        return this.current === Status.notCancellable;
    }
}

export { CancellableStatus, Status as CancellableStatusEnum };
