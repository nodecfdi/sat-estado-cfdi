import { ConsumerClientInterface } from '../src/contracts/consumer-client-interface';
import { ConsumerClientResponseInterface } from '../src/contracts/consumer-client-response-interface';
import { ConsumerClientResponse } from '../src/utils/consumer-client-response';

export class FakeConsumerClient implements ConsumerClientInterface {
    private consumeResponse!: ConsumerClientResponseInterface;

    public lastUri = '';

    public lastExpression = '';

    constructor(predefined: Record<string, string>) {
        this.setClientResponse(predefined);
    }

    public consume(uri: string, expression: string): ConsumerClientResponseInterface {
        this.lastUri = uri;
        this.lastExpression = expression;

        return this.consumeResponse;
    }

    public setClientResponse(predefined: Record<string, string>): void {
        this.consumeResponse = FakeConsumerClient.consumerClientResponseFromArray(predefined);
    }

    public static consumerClientResponseFromArray(input: Record<string, string>): ConsumerClientResponseInterface {
        const consumeResponse = new ConsumerClientResponse();
        consumeResponse.set(input);

        return consumeResponse;
    }
}
