import { type EnumLike } from '#src/types';

export default class EfosStatus {
  public static readonly Included = 0;

  public static readonly Excluded = 1;

  public constructor(private readonly _current: EnumLike<typeof EfosStatus>) {}

  public isIncluded(): boolean {
    return this._current === EfosStatus.Included;
  }

  public isExcluded(): boolean {
    return this._current === EfosStatus.Excluded;
  }
}
