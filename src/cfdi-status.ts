import { type CancellableStatus } from './status/cancellable-status';
import { type CancellationStatus } from './status/cancellation-status';
import { type DocumentStatus } from './status/document-status';
import { type EfosStatus } from './status/efos-status';
import { type QueryStatus } from './status/query-status';

export class CfdiStatus {
  /**
   *
   */
  constructor(
    private readonly query: QueryStatus,
    private readonly document: DocumentStatus,
    private readonly cancellable: CancellableStatus,
    private readonly cancellation: CancellationStatus,
    private readonly efos: EfosStatus,
    private readonly rawResponse: Record<string, string | null>,
  ) {}

  public getQuery(): QueryStatus {
    return this.query;
  }

  public getDocument(): DocumentStatus {
    return this.document;
  }

  public getCancellable(): CancellableStatus {
    return this.cancellable;
  }

  public getCancellation(): CancellationStatus {
    return this.cancellation;
  }

  public getEfos(): EfosStatus {
    return this.efos;
  }

  public getRawResponse(): Record<string, string | null> {
    return this.rawResponse;
  }
}
