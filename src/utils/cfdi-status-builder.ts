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
            return new QueryStatus(QueryStatusEnum.found);
        }

        // N - 60? ...
        return new QueryStatus(QueryStatusEnum.notFound);
    }

    public createDocumentSatus(): DocumentStatus {
        if ('Vigente' === this.estado) {
            return new DocumentStatus(DocumentStatusEnum.active);
        }
        if ('Cancelado' === this.estado) {
            return new DocumentStatus(DocumentStatusEnum.canceled);
        }

        // No encontrado
        return new DocumentStatus(DocumentStatusEnum.notFound);
    }

    public createCancellableStatus(): CancellableStatus {
        if ('Cancelable sin aceptación' === this.esCancelable) {
            return new CancellableStatus(CancellableStatusEnum.cancellableByDirectCall);
        }
        if ('Cancelable con aceptación' === this.esCancelable) {
            return new CancellableStatus(CancellableStatusEnum.cancellableByApproval);
        }

        // No cancelable
        return new CancellableStatus(CancellableStatusEnum.notCancellable);
    }

    public createCancellationStatus(): CancellationStatus {
        if ('Cancelado sin aceptación' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.cancelledByDirectCall);
        }
        if ('Plazo vencido' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.cancelledByExpiration);
        }
        if ('Cancelado con aceptación' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.cancelledByApproval);
        }
        if ('En proceso' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.pending);
        }
        if ('Solicitud rechazada' === this.estatusCancelacion) {
            return new CancellationStatus(CancellationStatusEnum.disapproved);
        }

        // vacío
        return new CancellationStatus(CancellationStatusEnum.undefined);
    }

    public createEfosStatus(): EfosStatus {
        if ('200' === this.validacionEFOS) {
            return new EfosStatus(EfosStatusEnum.excluded);
        }

        return new EfosStatus(EfosStatusEnum.included);
    }
}
