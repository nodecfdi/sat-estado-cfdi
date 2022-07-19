import { Status } from './enums/query-status';
class QueryStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isFound(): boolean {
        return this.current == Status.Found;
    }

    public isNotFound(): boolean {
        return this.current == Status.NotFound;
    }
}

export { QueryStatus, Status as QueryStatusEnum };
