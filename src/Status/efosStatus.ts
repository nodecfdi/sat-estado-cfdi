class EfosStatus {
  private current: EfosStatus.status.included | EfosStatus.status.excluded;

  constructor(status: EfosStatus.status.included | EfosStatus.status.excluded) {
    this.current = status;
  }

  isIncluded(): boolean {
    return this.current === EfosStatus.status.included;
  }

  isExcluded(): boolean {
    return this.current === EfosStatus.status.excluded;
  }
}

namespace EfosStatus {
  export enum status {
    included,
    excluded,
  }
}

export { EfosStatus };
