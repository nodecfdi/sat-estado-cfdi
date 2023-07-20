import { Status } from './enums/query-status';

class QueryStatus {
    constructor(private readonly current: Status) {}

    public isFound(): boolean {
        return this.current === Status.Found;
    }

    public isNotFound(): boolean {
        return this.current === Status.NotFound;
    }
}

export { QueryStatus };

export { Status as QueryStatusEnum } from './enums/query-status';
