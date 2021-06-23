class DocumentStatus {
  private current: DocumentStatus.status.canceled | DocumentStatus.status.active | DocumentStatus.status.notFound;

  constructor(status: DocumentStatus.status.canceled | DocumentStatus.status.active | DocumentStatus.status.notFound) {
    this.current = status;
  }

  isActive(): boolean {
    return this.current === DocumentStatus.status.active;
  }

  public isCanceled(): boolean {
    return this.current === DocumentStatus.status.canceled;
  }

  public isNotFound(): boolean {
    return this.current === DocumentStatus.status.notFound;
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace DocumentStatus {
  export enum status {
    canceled,
    active,
    notFound,
  }
}

export { DocumentStatus };
