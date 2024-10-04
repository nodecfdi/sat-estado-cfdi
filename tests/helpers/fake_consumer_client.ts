import { type ConsumerClientInterface, type ConsumerClientResponseInterface } from '#src/types';
import ConsumerClientResponse from '#src/utils/consumer_client_response';

export default class FakeConsumerClient implements ConsumerClientInterface {
  /** Consume method will return this variable when invoked  */
  private readonly _consumeResponse: ConsumerClientResponseInterface;

  /** Consume method will populate this variable with uri input */
  public lastUri = '';

  /** Consume method will populate this variable with expression input */
  public lastExpression = '';

  public constructor(values: Record<string, string> = {}) {
    this._consumeResponse = new ConsumerClientResponse(values);
  }

  public async consume(uri: string, expression: string): Promise<ConsumerClientResponseInterface> {
    this.lastUri = uri;
    this.lastExpression = expression;

    return new Promise((resolve) => {
      setTimeout(resolve, 200, this._consumeResponse);
    });
  }
}
