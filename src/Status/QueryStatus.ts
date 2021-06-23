class QueryStatus {
  private current: QueryStatus.status.found | QueryStatus.status.notFound;

  constructor(status: QueryStatus.status.found | QueryStatus.status.notFound) {
    this.current = status;
  }

  isFound(): boolean {
    return this.current == QueryStatus.status.found;
  }

  isNotFound(): boolean {
    return this.current == QueryStatus.status.notFound;
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace QueryStatus {
  export enum status {
    found,
    notFound,
  }
}

export { QueryStatus };
