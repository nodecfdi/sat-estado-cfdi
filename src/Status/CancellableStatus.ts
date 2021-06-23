class CancellableStatus {
  private current:
    | CancellableStatus.status.cancellableByDirectCall
    | CancellableStatus.status.cancellableByApproval
    | CancellableStatus.status.notCancellable;

  constructor(
    status:
      | CancellableStatus.status.cancellableByDirectCall
      | CancellableStatus.status.cancellableByApproval
      | CancellableStatus.status.notCancellable,
  ) {
    this.current = status;
  }

  public byDirectCall(): boolean {
    return this.current === CancellableStatus.status.cancellableByDirectCall;
  }

  public byApproval(): boolean {
    return this.current === CancellableStatus.status.cancellableByApproval;
  }
  public notCancellable(): boolean {
    return this.current === CancellableStatus.status.notCancellable;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace CancellableStatus {
  export enum status {
    cancellableByDirectCall,
    cancellableByApproval,
    notCancellable,
  }
}

export { CancellableStatus };
