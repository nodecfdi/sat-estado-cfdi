import { type ConsumerClientResponseInterface } from './consumer-client-response-interface';

export interface ConsumerClientInterface {
  consume<T extends ConsumerClientResponseInterface>(
    uri: string,
    expression: string,
  ): T | Promise<T>;
}
