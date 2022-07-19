import { ConsumerClientResponseInterface } from './consumer-client-response-interface';

export interface ConsumerClientInterface {
    consume(
        uri: string,
        expression: string
    ): ConsumerClientResponseInterface | Promise<ConsumerClientResponseInterface>;
}
