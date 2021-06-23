import { CfdiStatus } from '../cfdiStatus';
import { CancellableStatus } from '../Status/cancellableStatus';
import { CancellationStatus } from '../Status/cancellationStatus';
import { DocumentStatus } from '../Status/documentStatus';
import { EfosStatus } from '../Status/efosStatus';
import { QueryStatus } from '../Status/queryStatus';

export class CfdiStatusBuilder {
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

  public createQueryStatus(): QueryStatus.status {
    // S - Comprobante obtenido satisfactoriamente
    const check = /S - /.exec(this.codigoEstatus);
    if (check && check[0]) {
      return QueryStatus.status.found;
    }
    // N - 60? ...
    return QueryStatus.status.notFound;
  }

  public createDocumentSatus(): DocumentStatus.status {
    if ('Vigente' === this.estado) {
      return DocumentStatus.status.active;
    }
    if ('Cancelado' === this.estado) {
      return DocumentStatus.status.canceled;
    }
    // No encontrado
    return DocumentStatus.status.notFound;
  }

  public createCancellableStatus(): CancellableStatus.status {
    if ('Cancelable sin aceptación' === this.esCancelable) {
      return CancellableStatus.status.cancellableByDirectCall;
    }
    if ('Cancelable con aceptación' === this.esCancelable) {
      return CancellableStatus.status.cancellableByApproval;
    }
    // No cancelable
    return CancellableStatus.status.notCancellable;
  }

  public createCancellationStatus(): CancellationStatus.status {
    if ('Cancelado sin aceptación' === this.estatusCancelacion) {
      return CancellationStatus.status.cancelledByDirectCall;
    }
    if ('Plazo vencido' === this.estatusCancelacion) {
      return CancellationStatus.status.cancelledByExpiration;
    }
    if ('Cancelado con aceptación' === this.estatusCancelacion) {
      return CancellationStatus.status.cancelledByApproval;
    }
    if ('En proceso' === this.estatusCancelacion) {
      return CancellationStatus.status.pending;
    }
    if ('Solicitud rechazada' === this.estatusCancelacion) {
      return CancellationStatus.status.disapproved;
    }
    // vacío
    return CancellationStatus.status.undefined;
  }

  public createEfosStatus(): EfosStatus.status {
    if ('200' === this.validacionEFOS) {
      return EfosStatus.status.excluded;
    }
    return EfosStatus.status.included;
  }
}
