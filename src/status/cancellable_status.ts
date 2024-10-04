import { type EnumLike } from '#src/types';

export default class CancellableStatus {
  public static readonly CancellableByDirectCall = 0;

  public static readonly CancellableByApproval = 1;

  public static readonly NotCancellable = 2;

  public constructor(private readonly _current: EnumLike<typeof CancellableStatus>) {}

  public isCancellableByDirectCall(): boolean {
    return this._current === CancellableStatus.CancellableByDirectCall;
  }

  public isCancellableByApproval(): boolean {
    return this._current === CancellableStatus.CancellableByApproval;
  }

  public isNotCancellable(): boolean {
    return this._current === CancellableStatus.NotCancellable;
  }
}
