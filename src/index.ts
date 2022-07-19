import { ConsumerClientInterface } from './contracts/consumer-client-interface';
import { ConsumerClientResponseInterface } from './contracts/consumer-client-response-interface';
import { Consumer } from './consumer';
import { ConsumerClientResponse } from './utils/consumer-client-response';

export { Consumer, ConsumerClientResponse };
export type { ConsumerClientInterface, ConsumerClientResponseInterface };

Object.assign(module.exports, Consumer);
Object.assign(module.exports, ConsumerClientResponse);
