class Consumer {
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
}