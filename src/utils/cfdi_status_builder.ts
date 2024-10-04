import CfdiStatus from '#src/cfdi_status';
import CancellableStatus from '#src/status/cancellable_status';
import CancellationStatus from '#src/status/cancellation_status';
import DocumentStatus from '#src/status/document_status';
import EfosStatus from '#src/status/efos_status';
import QueryStatus from '#src/status/query_status';
import { type CfdiStatusRawResponse } from '#src/types';

/**
 * Use this class to create a CfdiStatus from the raw string states from SAT webservice
 */
export default class CfdiStatusBuilder {
  public constructor(
    private readonly _codigoEstatus: string,
    private readonly _estado: string,
    private readonly _esCancelable: string,
    private readonly _estatusCancelacion: string,
    private readonly _validacionEFOS: string,
    private readonly _rawResponse: CfdiStatusRawResponse,
  ) {}

  public createQueryStatus(): QueryStatus {
    // S - Comprobante obtenido satisfactoriamente
    if (this._codigoEstatus.startsWith('S - ')) {
      return new QueryStatus(QueryStatus.Found);
    }

    // N - 60? ...
    return new QueryStatus(QueryStatus.NotFound);
  }

  public createDocumentStatus(): DocumentStatus {
    if (this._estado === 'Vigente') {
      return new DocumentStatus(DocumentStatus.Active);
    }

    if (this._estado === 'Cancelado') {
      return new DocumentStatus(DocumentStatus.Cancelled);
    }

    // No encontrado
    return new DocumentStatus(DocumentStatus.NotFound);
  }

  public createCancellableStatus(): CancellableStatus {
    if (this._esCancelable === 'Cancelable sin aceptación') {
      return new CancellableStatus(CancellableStatus.CancellableByDirectCall);
    }

    if (this._esCancelable === 'Cancelable con aceptación') {
      return new CancellableStatus(CancellableStatus.CancellableByApproval);
    }

    // No cancelable
    return new CancellableStatus(CancellableStatus.NotCancellable);
  }

  public createCancellationStatus(): CancellationStatus {
    if (this._estatusCancelacion === 'Cancelado sin aceptación') {
      return new CancellationStatus(CancellationStatus.CancelledByDirectCall);
    }

    if (this._estatusCancelacion === 'Plazo vencido') {
      return new CancellationStatus(CancellationStatus.CancelledByExpiration);
    }

    if (this._estatusCancelacion === 'Cancelado con aceptación') {
      return new CancellationStatus(CancellationStatus.CancelledByApproval);
    }

    if (this._estatusCancelacion === 'En proceso') {
      return new CancellationStatus(CancellationStatus.Pending);
    }

    if (this._estatusCancelacion === 'Solicitud rechazada') {
      return new CancellationStatus(CancellationStatus.Disapproved);
    }

    // vacío
    return new CancellationStatus(CancellationStatus.Undefined);
  }

  public createEfosStatus(): EfosStatus {
    if (this._validacionEFOS === '200' || this._validacionEFOS === '201') {
      return new EfosStatus(EfosStatus.Excluded);
    }

    return new EfosStatus(EfosStatus.Included);
  }

  public create(): CfdiStatus {
    return new CfdiStatus(
      this.createQueryStatus(),
      this.createDocumentStatus(),
      this.createCancellableStatus(),
      this.createCancellationStatus(),
      this.createEfosStatus(),
      this._rawResponse,
    );
  }
}
