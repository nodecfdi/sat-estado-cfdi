import { ConsumerClientResponseInterface } from './ConsumerClientResponseInterface';

export interface ConsumerClientInterface {
    consume(uri: string, expression: string): ConsumerClientResponseInterface;
}