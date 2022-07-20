import { CfdiStatus } from './cfdi-status';
import { ConsumerClientInterface } from './contracts/consumer-client-interface';
import { ConsumerClientResponseInterface } from './contracts/consumer-client-response-interface';
import { CfdiStatusBuilder } from './utils/cfdi-status-builder';

export class Consumer {
    public static readonly WEBSERVICE_URI_PRODUCTION =
        'https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc';

    public static readonly WEBSERVICE_URI_DEVELOPMENT =
        'https://pruebacfdiconsultaqr.cloudapp.net/ConsultaCFDIService.svc';

    private client: ConsumerClientInterface;

    private uri: string;

    /**
     *
     */
    constructor(factory: ConsumerClientInterface, uri: string = Consumer.WEBSERVICE_URI_PRODUCTION) {
        this.client = factory;
        this.uri = uri;
    }

    public getClient(): ConsumerClientInterface {
        return this.client;
    }

    public getUri(): string {
        return this.uri;
    }

    public execute(expression: string): CfdiStatus {
        const responseConsumer = this.getClient().consume<ConsumerClientResponseInterface>(
            this.getUri(),
            expression
        ) as ConsumerClientResponseInterface;

        const builder = new CfdiStatusBuilder(
            responseConsumer.get('CodigoEstatus'),
            responseConsumer.get('Estado'),
            responseConsumer.get('EsCancelable'),
            responseConsumer.get('EstatusCancelacion'),
            responseConsumer.get('ValidacionEFOS')
        );

        return builder.create();
    }

    public async executeAsync(expression: string): Promise<CfdiStatus> {
        const client = this.getClient();
        const responseConsumer = await client.consume(this.getUri(), expression);
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
