import { ConsumerClientInterface } from './Contracts/ConsumerClientInterface';
import { ConsumerClientResponseInterface } from './Contracts/ConsumerClientResponseInterface';
import { Consumer } from './Consumer';
import { ConsumerClientResponse } from './Utils/ConsumerClientResponse'

export { ConsumerClientInterface, ConsumerClientResponseInterface, Consumer, ConsumerClientResponse };

Object.assign(module.exports, Consumer);
Object.assign(module.exports, ConsumerClientResponse);
