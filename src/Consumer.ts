import { CfdiStatus } from './CfdiStatus';
import { ConsumerClientInterface } from './Contracts/ConsumerClient';
import { CfdiStatusBuilder } from './Utils/CfdiStatusBuilder';

export class Consumer {
    static readonly  WEBSERVICE_URI_PRODUCTION = 'https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc';

    static readonly WEBSERVICE_URI_DEVELOPMENT = 'https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc';

     private client: ConsumerClientInterface;

     private uri: string;

     /**
      *
      */
     constructor(factory: ConsumerClientInterface, uri: string = Consumer.WEBSERVICE_URI_DEVELOPMENT) {
        this.client = factory;
        this.uri = uri;
     }

     public getClient(): ConsumerClientInterface
    {
        return this.client;
    }

    public getUri(): string
    {
        return this.uri;
    }

    public execute(expression: string): CfdiStatus
    {
        const responseConsumer = this.getClient().consume(this.getUri(), expression);

        const builder = new CfdiStatusBuilder(
            responseConsumer.get('CodigoEstatus'),
            responseConsumer.get('Estado'),
            responseConsumer.get('EsCancelable'),
            responseConsumer.get('EstatusCancelacion'),
            responseConsumer.get('ValidacionEFOS')
        );

        return builder.create();
    }
}