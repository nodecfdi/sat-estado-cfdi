import type CancellableStatus from '#src/status/cancellable_status';
import type CancellationStatus from '#src/status/cancellation_status';
import type DocumentStatus from '#src/status/document_status';
import type EfosStatus from '#src/status/efos_status';
import type QueryStatus from '#src/status/query_status';
import { type CfdiStatusRawResponse } from '#src/types';

export default class CfdiStatus {
  public constructor(
    public readonly query: QueryStatus,
    public readonly document: DocumentStatus,
    public readonly cancellable: CancellableStatus,
    public readonly cancellation: CancellationStatus,
    public readonly efos: EfosStatus,
    public readonly rawResponse: CfdiStatusRawResponse,
  ) {}
}
