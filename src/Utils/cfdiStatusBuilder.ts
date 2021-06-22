import { CfdiStatus } from '../cfdiStatus';
import { CancellableStatus } from '../Status/cancellableStatus';
import { CancellationStatus } from '../Status/cancellationStatus';
import { DocumentStatus } from '../Status/documentStatus';
import { EfosStatus } from '../Status/efosStatus';
import { QueryStatus } from '../Status/queryStatus';

export default class CfdiStatusBuilder {
  private codigoEstatus: string;

  private estado: string;

  private esCancelable: string;

  private estatusCancelacion: string;

  private validacionEFOS: string;

  /**
   *
   */
  constructor(
    codigoEstatus: string,
    estado: string,
    esCancelable: string,
    estatusCacelacion: string,
    validacionEfos: string,
  ) {
    this.codigoEstatus = codigoEstatus;
    this.estado = estado;
    this.esCancelable = esCancelable;
    this.estatusCancelacion = estatusCacelacion;
    this.validacionEFOS = validacionEfos;
  }

  public create(): CfdiStatus {
    return new CfdiStatus(
      this.createQueryStatus(),
      this.createDocumentSatus(),
      this.createCancellableStatus(),
      this.createCancellationStatus(),
      this.createEfosStatus(),
    );
  }

  public createQueryStatus(): QueryStatus {
    // S - Comprobante obtenido satisfactoriamente
    const check = this.codigoEstatus.match('S - ');
    if (check && check[0]) {
      return QueryStatus.found;
    }
    // N - 60? ...
    return QueryStatus.notFound;
  }

  public queryStatusIsFound(): boolean {
    return this.createQueryStatus() === QueryStatus.found;
  }

  public queryStatusIsNotFound(): boolean {
    return this.createQueryStatus() === QueryStatus.notFound;
  }

  public createDocumentSatus(): DocumentStatus {
    if ('Vigente' === this.estado) {
      return DocumentStatus.active;
    }
    if ('Cancelado' === this.estado) {
      return DocumentStatus.canceled;
    }
    // No encontrado
    return DocumentStatus.notFound;
  }

  public documentStatusIsActive(): boolean {
    return this.createDocumentSatus() === DocumentStatus.active;
  }

  public documentStatusIsCanceled(): boolean {
    return this.createDocumentSatus() === DocumentStatus.canceled;
  }

  public documentStatusIsNotFound(): boolean {
    return this.createDocumentSatus() === DocumentStatus.notFound;
  }

  public createCancellableStatus(): CancellableStatus {
    if ('Cancelable sin aceptación' === this.esCancelable) {
      return CancellableStatus.cancellableByDirectCall;
    }
    if ('Cancelable con aceptación' === this.esCancelable) {
      return CancellableStatus.cancellableByApproval;
    }
    // No cancelable
    return CancellableStatus.notCancellable;
  }

  public cancellableStatusByDirectCall(): boolean {
    return this.createCancellableStatus() === CancellableStatus.cancellableByDirectCall;
  }

  public cancellableStatusByApproval(): boolean {
    return this.createCancellableStatus() === CancellableStatus.cancellableByApproval;
  }
  public cancellableStatusNotCancellable(): boolean {
    return this.createCancellableStatus() === CancellableStatus.notCancellable;
  }

  public createCancellationStatus(): CancellationStatus {
    if ('Cancelado sin aceptación' === this.estatusCancelacion) {
      return CancellationStatus.cancelledByDirectCall;
    }
    if ('Plazo vencido' === this.estatusCancelacion) {
      return CancellationStatus.cancelledByExpiration;
    }
    if ('Cancelado con aceptación' === this.estatusCancelacion) {
      return CancellationStatus.cancelledByApproval;
    }
    if ('En proceso' === this.estatusCancelacion) {
      return CancellationStatus.pending;
    }
    if ('Solicitud rechazada' === this.estatusCancelacion) {
      return CancellationStatus.disapproved;
    }
    // vacío
    return CancellationStatus.undefined;
  }

  public cancellationStatusIsUndefined(): boolean {
    return this.createCancellationStatus() === CancellationStatus.undefined;
  }

  public cancellationStatusIsPending(): boolean {
    return this.createCancellationStatus() === CancellationStatus.pending;
  }

  public cancellationStatusIsDisapprved(): boolean {
    return this.createCancellationStatus() === CancellationStatus.disapproved;
  }

  public cancellationStatusIsCancelledByApproval(): boolean {
    return this.createCancellationStatus() === CancellationStatus.cancelledByApproval;
  }

  public cancellationStatusIsCancelledByExpiration(): boolean {
    return this.createCancellationStatus() === CancellationStatus.cancelledByExpiration;
  }

  public cancellationStatusIsCancelledByDirectCall(): boolean {
    return this.createCancellationStatus() === CancellationStatus.cancelledByDirectCall;
  }

  public createEfosStatus(): EfosStatus {
    if ('200' === this.validacionEFOS) {
      return EfosStatus.excluded;
    }
    return EfosStatus.included;
  }

  public efosStatusIsIncluded(): boolean {
    return this.createEfosStatus() === EfosStatus.included;
  }

  public efosStatusIsExcluded(): boolean {
    return this.createEfosStatus() === EfosStatus.excluded;
  }
}
