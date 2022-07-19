import { Status } from './enums/efos-status';

class EfosStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isIncluded(): boolean {
        return this.current === Status.included;
    }

    public isExcluded(): boolean {
        return this.current === Status.excluded;
    }
}

export { EfosStatus, Status as EfosStatusEnum };
