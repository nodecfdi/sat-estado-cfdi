import { CancellableStatus, CancellableStatusEnum } from '../status/cancellable-status';
import { CancellationStatus, CancellationStatusEnum } from '../status/cancellation-status';
import { DocumentStatus, DocumentStatusEnum } from '../status/document-status';
import { EfosStatus, EfosStatusEnum } from '../status/efos-status';
import { QueryStatus, QueryStatusEnum } from '../status/query-status';
import { CfdiStatus } from '../cfdi-status';

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
        validacionEfos: string
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
            this.createEfosStatus()
        );
    }

    public createQueryStatus(): QueryStatus {
        // S - Comprobante obtenido satisfactoriamente
        const check = /S - /.exec(this.codigoEstatus);
        if (check && check[0]) {
            return new QueryStatus(QueryStatusEnum.Found);
        }

        // N - 60? ...
        return new QueryStatus(QueryStatusEnum.NotFound);
    }

    public createDocumentSatus(): DocumentStatus {
        if ('Vigente' === this.estado) {
            return new DocumentStatus(DocumentStatusEnum.Active);
        }
        if ('Cancelado' === this.estado) {
            return new DocumentStatus(DocumentStatusEnum.Canceled);
        }

        // No encontrado
        return new DocumentStatus(DocumentStatusEnum.NotFound);
    }

    public createCancellableStatus(): CancellableStatus {
        if ('Cancelable sin aceptación' === this.esCancelable) {
            return new CancellableStatus(CancellableStatusEnum.CancellableByDirectCall);
        }
        if ('Cancelable con aceptación' === this.esCancelable) {
            return new CancellableStatus(CancellableStatusEnum.CancellableByApproval);
        }

        // No cancelable
        return new CancellableStatus(CancellableStatusEnum.NotCancellable);
    }

    public createCancellationStatus(): CancellationStatus {
        if ('Cancelado sin aceptación' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.CancelledByDirectCall);
        }
        if ('Plazo vencido' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.CancelledByExpiration);
        }
        if ('Cancelado con aceptación' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.CancelledByApproval);
        }
        if ('En proceso' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.Pending);
        }
        if ('Solicitud rechazada' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.Disapproved);
        }

        // vacío
        return new CancellationStatus(CancellationStatusEnum.Undefined);
    }

    public createEfosStatus(): EfosStatus {
        if ('200' === this.validacionEFOS) {
            return new EfosStatus(EfosStatusEnum.Excluded);
        }

        return new EfosStatus(EfosStatusEnum.Included);
    }
}
