import { Status } from './enums/query-status';
class QueryStatus {
    private current: Status;

    constructor(status: Status) {
        this.current = status;
    }

    public isFound(): boolean {
        return this.current == Status.found;
    }

    public isNotFound(): boolean {
        return this.current == Status.notFound;
    }
}

export { QueryStatus, Status as QueryStatusEnum };
