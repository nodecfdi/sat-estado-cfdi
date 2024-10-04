import { Status } from './enums/efos-status';

class EfosStatus {
  constructor(private readonly current: Status) {}

  public isIncluded(): boolean {
    return this.current === Status.Included;
  }

  public isExcluded(): boolean {
    return this.current === Status.Excluded;
  }
}

export { EfosStatus };

export { Status as EfosStatusEnum } from './enums/efos-status';
