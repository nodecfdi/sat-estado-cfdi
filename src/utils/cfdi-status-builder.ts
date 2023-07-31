import { CancellableStatus, CancellableStatusEnum } from '../status/cancellable-status';
import { CancellationStatus, CancellationStatusEnum } from '../status/cancellation-status';
import { DocumentStatus, DocumentStatusEnum } from '../status/document-status';
import { EfosStatus, EfosStatusEnum } from '../status/efos-status';
import { QueryStatus, QueryStatusEnum } from '../status/query-status';
import { CfdiStatus } from '../cfdi-status';

export class CfdiStatusBuilder {
    /**
     *
     */
    constructor(
        private readonly codigoEstatus: string,
        private readonly estado: string,
        private readonly esCancelable: string,
        private readonly estatusCancelacion: string,
        private readonly validacionEFOS: string,
        private readonly rawResponse: Record<string, string | null>,
    ) {}

    public createQueryStatus(): QueryStatus {
        // S - Comprobante obtenido satisfactoriamente
        const check = /S - /.exec(this.codigoEstatus);
        if (check?.[0]) {
            return new QueryStatus(QueryStatusEnum.Found);
        }

        // N - 60? ...
        return new QueryStatus(QueryStatusEnum.NotFound);
    }

    public createDocumentSatus(): DocumentStatus {
        if (this.estado === 'Vigente') {
            return new DocumentStatus(DocumentStatusEnum.Active);
        }

        if (this.estado === 'Cancelado') {
            return new DocumentStatus(DocumentStatusEnum.Canceled);
        }

        // No encontrado
        return new DocumentStatus(DocumentStatusEnum.NotFound);
    }

    public createCancellableStatus(): CancellableStatus {
        if (this.esCancelable === 'Cancelable sin aceptación') {
            return new CancellableStatus(CancellableStatusEnum.CancellableByDirectCall);
        }

        if (this.esCancelable === 'Cancelable con aceptación') {
            return new CancellableStatus(CancellableStatusEnum.CancellableByApproval);
        }

        // No cancelable
        return new CancellableStatus(CancellableStatusEnum.NotCancellable);
    }

    public createCancellationStatus(): CancellationStatus {
        if (this.estatusCancelacion === 'Cancelado sin aceptación') {
            return new CancellationStatus(CancellationStatusEnum.CancelledByDirectCall);
        }

        if (this.estatusCancelacion === 'Plazo vencido') {
            return new CancellationStatus(CancellationStatusEnum.CancelledByExpiration);
        }

        if (this.estatusCancelacion === 'Cancelado con aceptación') {
            return new CancellationStatus(CancellationStatusEnum.CancelledByApproval);
        }

        if (this.estatusCancelacion === 'En proceso') {
            return new CancellationStatus(CancellationStatusEnum.Pending);
        }

        if (this.estatusCancelacion === 'Solicitud rechazada') {
            return new CancellationStatus(CancellationStatusEnum.Disapproved);
        }

        // vacío
        return new CancellationStatus(CancellationStatusEnum.Undefined);
    }

    public createEfosStatus(): EfosStatus {
        if (this.validacionEFOS === '200') {
            return new EfosStatus(EfosStatusEnum.Excluded);
        }

        return new EfosStatus(EfosStatusEnum.Included);
    }

    public create(): CfdiStatus {
        return new CfdiStatus(
            this.createQueryStatus(),
            this.createDocumentSatus(),
            this.createCancellableStatus(),
            this.createCancellationStatus(),
            this.createEfosStatus(),
            this.rawResponse,
        );
    }
}
