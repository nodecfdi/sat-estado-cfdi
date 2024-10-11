import CancellableStatus from '#src/status/cancellable_status';
import CancellationStatus from '#src/status/cancellation_status';
import DocumentStatus from '#src/status/document_status';
import EfosStatus from '#src/status/efos_status';
import QueryStatus from '#src/status/query_status';
import { type CfdiStatusRawResponse, type EnumLike } from '#src/types';

export default class CfdiStatus {
  public constructor(
    public readonly query: QueryStatus,
    public readonly document: DocumentStatus,
    public readonly cancellable: CancellableStatus,
    public readonly cancellation: CancellationStatus,
    public readonly efos: EfosStatus,
    public readonly rawResponse: CfdiStatusRawResponse,
  ) {}

  public static fromEnumValues(
    query: EnumLike<typeof QueryStatus>,
    document: EnumLike<typeof DocumentStatus>,
    cancellable: EnumLike<typeof CancellableStatus>,
    cancellation: EnumLike<typeof CancellationStatus>,
    efos: EnumLike<typeof EfosStatus>,
    rawResponse: CfdiStatusRawResponse,
  ): CfdiStatus {
    return new CfdiStatus(
      new QueryStatus(query),
      new DocumentStatus(document),
      new CancellableStatus(cancellable),
      new CancellationStatus(cancellation),
      new EfosStatus(efos),
      rawResponse,
    );
  }
}
