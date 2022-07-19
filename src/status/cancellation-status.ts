import { Status } from './enums/cancellation-status';
class CancellationStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isUndefined(): boolean {
        return this.current === Status.undefined;
    }

    public isPending(): boolean {
        return this.current === Status.pending;
    }

    public isDisapproved(): boolean {
        return this.current === Status.disapproved;
    }

    public isCancelledByApproval(): boolean {
        return this.current === Status.cancelledByApproval;
    }

    public isCancelledByExpiration(): boolean {
        return this.current === Status.cancelledByExpiration;
    }

    public isCancelledByDirectCall(): boolean {
        return this.current === Status.cancelledByDirectCall;
    }
}

export { CancellationStatus, Status as CancellationStatusEnum };
