import { ConsumerClientResponseInterface } from "./consumerClientResponse";

export interface ConsumerClientInterface {
    consume(uri: string, expression: string): ConsumerClientResponseInterface;
}