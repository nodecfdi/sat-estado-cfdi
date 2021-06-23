import { CancellableStatus } from './Status/cancellableStatus';
import { CancellationStatus } from './Status/cancellationStatus';
import { DocumentStatus } from './Status/documentStatus';
import { EfosStatus } from './Status/efosStatus';
import { QueryStatus } from './Status/queryStatus';

export class CfdiStatus {
  private query: QueryStatus;

  private document: DocumentStatus;

  private cancellable: CancellableStatus;

  private cancellation: CancellationStatus;

  private efos: EfosStatus;

  /**
   *
   */
  constructor(
    query: QueryStatus.status,
    document: DocumentStatus.status,
    cancellable: CancellableStatus.status,
    cancellation: CancellationStatus.status,
    efos: EfosStatus.status,
  ) {
    this.query = new QueryStatus(query);
    this.document = new DocumentStatus(document);
    this.cancellable = new CancellableStatus(cancellable);
    this.cancellation = new CancellationStatus(cancellation);
    this.efos = new EfosStatus(efos);
  }

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
}
