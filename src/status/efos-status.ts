import { Status } from './enums/efos-status';

class EfosStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isIncluded(): boolean {
        return this.current === Status.Included;
    }

    public isExcluded(): boolean {
        return this.current === Status.Excluded;
    }
}

export { EfosStatus, Status as EfosStatusEnum };
