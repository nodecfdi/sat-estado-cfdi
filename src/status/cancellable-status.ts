import { Status } from './enums/cancellable-status';
class CancellableStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public cancellableByDirectCall(): boolean {
        return this.current === Status.CancellableByDirectCall;
    }

    public cancellableByApproval(): boolean {
        return this.current === Status.CancellableByApproval;
    }

    public notCancellable(): boolean {
        return this.current === Status.NotCancellable;
    }
}

export { CancellableStatus, Status as CancellableStatusEnum };
