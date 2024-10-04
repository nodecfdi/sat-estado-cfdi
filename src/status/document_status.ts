import { type EnumLike } from '#src/types';

export default class DocumentStatus {
  public static readonly Active = 0;

  public static readonly Cancelled = 1;

  public static readonly NotFound = 2;

  public constructor(private readonly _current: EnumLike<typeof DocumentStatus>) {}

  public isActive(): boolean {
    return this._current === DocumentStatus.Active;
  }

  public isCancelled(): boolean {
    return this._current === DocumentStatus.Cancelled;
  }

  public isNotFound(): boolean {
    return this._current === DocumentStatus.NotFound;
  }
}
