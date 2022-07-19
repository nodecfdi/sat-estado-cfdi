import { ConsumerClientResponseInterface } from './consumer-client-response-interface';

export interface ConsumerClientInterface {
    consume<T extends ConsumerClientResponseInterface | Promise<ConsumerClientResponseInterface>>(
        uri: string,
        expression: string
    ): T;
}
