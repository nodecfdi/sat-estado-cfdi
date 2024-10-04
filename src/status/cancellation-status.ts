import { Status } from './enums/cancellation-status';

class CancellationStatus {
  constructor(private readonly current: Status) {}

  public isUndefined(): boolean {
    return this.current === Status.Undefined;
  }

  public isPending(): boolean {
    return this.current === Status.Pending;
  }

  public isDisapproved(): boolean {
    return this.current === Status.Disapproved;
  }

  public isCancelledByApproval(): boolean {
    return this.current === Status.CancelledByApproval;
  }

  public isCancelledByExpiration(): boolean {
    return this.current === Status.CancelledByExpiration;
  }

  public isCancelledByDirectCall(): boolean {
    return this.current === Status.CancelledByDirectCall;
  }
}

export { CancellationStatus };

export { Status as CancellationStatusEnum } from './enums/cancellation-status';
