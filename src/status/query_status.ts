import { type EnumLike } from '#src/types';

export default class QueryStatus {
  public static readonly Found = 0;

  public static readonly NotFound = 1;

  public constructor(private readonly _current: EnumLike<typeof QueryStatus>) {}

  public isFound(): boolean {
    return this._current === QueryStatus.Found;
  }

  public isNotFound(): boolean {
    return this._current === QueryStatus.NotFound;
  }
}
