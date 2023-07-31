import { Status } from './enums/cancellable-status';

class CancellableStatus {
    constructor(private readonly current: Status) {}

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

export { CancellableStatus };

export { Status as CancellableStatusEnum } from './enums/cancellable-status';
