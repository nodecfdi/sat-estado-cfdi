import { ConsumerClientResponseInterface } from './ConsumerClientResponse';

export interface ConsumerClientInterface {
    consume(uri: string, expression: string): ConsumerClientResponseInterface;
}