import { type EnumLike } from '#src/types';

export default class CancellationStatus {
  public static readonly Undefined = 0;

  public static readonly Pending = 1;

  public static readonly Disapproved = 2;

  public static readonly CancelledByApproval = 3;

  public static readonly CancelledByExpiration = 4;

  public static readonly CancelledByDirectCall = 5;

  public constructor(private readonly _current: EnumLike<typeof CancellationStatus>) {}

  public isUndefined(): boolean {
    return this._current === CancellationStatus.Undefined;
  }

  public isPending(): boolean {
    return this._current === CancellationStatus.Pending;
  }

  public isDisapproved(): boolean {
    return this._current === CancellationStatus.Disapproved;
  }

  public isCancelledByApproval(): boolean {
    return this._current === CancellationStatus.CancelledByApproval;
  }

  public isCancelledByExpiration(): boolean {
    return this._current === CancellationStatus.CancelledByExpiration;
  }

  public isCancelledByDirectCall(): boolean {
    return this._current === CancellationStatus.CancelledByDirectCall;
  }
}
