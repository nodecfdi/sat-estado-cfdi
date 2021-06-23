class CancellationStatus {
  private current:
    | CancellationStatus.status.undefined
    | CancellationStatus.status.pending
    | CancellationStatus.status.disapproved
    | CancellationStatus.status.cancelledByApproval
    | CancellationStatus.status.cancelledByExpiration
    | CancellationStatus.status.cancelledByDirectCall;

  constructor(
    status:
      | CancellationStatus.status.undefined
      | CancellationStatus.status.pending
      | CancellationStatus.status.disapproved
      | CancellationStatus.status.cancelledByApproval
      | CancellationStatus.status.cancelledByExpiration
      | CancellationStatus.status.cancelledByDirectCall,
  ) {
    this.current = status;
  }

  isUndefined(): boolean {
    return this.current === CancellationStatus.status.undefined;
  }

  public isPending(): boolean {
    return this.current === CancellationStatus.status.pending;
  }

  public isDisapprved(): boolean {
    return this.current === CancellationStatus.status.disapproved;
  }

  public isCancelledByApproval(): boolean {
    return this.current === CancellationStatus.status.cancelledByApproval;
  }

  public isCancelledByExpiration(): boolean {
    return this.current === CancellationStatus.status.cancelledByExpiration;
  }

  public isCancelledByDirectCall(): boolean {
    return this.current === CancellationStatus.status.cancelledByDirectCall;
  }
}

namespace CancellationStatus {
  export enum status {
    undefined,
    pending,
    disapproved,
    cancelledByApproval,
    cancelledByExpiration,
    cancelledByDirectCall,
  }
}

export { CancellationStatus };
