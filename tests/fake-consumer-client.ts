import { type ConsumerClientInterface } from 'src/contracts/consumer-client-interface';
import { type ConsumerClientResponseInterface } from 'src/contracts/consumer-client-response-interface';
import { ConsumerClientResponse } from 'src/utils/consumer-client-response';

export class FakeConsumerClient implements ConsumerClientInterface {
  public lastUri = '';

  public lastExpression = '';

  private consumeResponse!: ConsumerClientResponseInterface;

  constructor(predefined: Record<string, string>) {
    this.setClientResponse(predefined);
  }

  public static consumerClientResponseFromArray(
    input: Record<string, string>,
  ): ConsumerClientResponseInterface {
    const consumeResponse = new ConsumerClientResponse();
    consumeResponse.set(input);

    return consumeResponse;
  }

  public consume<ConsumerClientResponseInterface>(
    uri: string,
    expression: string,
  ): ConsumerClientResponseInterface {
    this.lastUri = uri;
    this.lastExpression = expression;

    return this.consumeResponse as unknown as ConsumerClientResponseInterface;
  }

  public setClientResponse(predefined: Record<string, string>): void {
    this.consumeResponse = FakeConsumerClient.consumerClientResponseFromArray(predefined);
  }
}
