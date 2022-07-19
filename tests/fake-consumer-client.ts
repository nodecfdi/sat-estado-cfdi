import { ConsumerClientInterface } from '~/contracts/consumer-client-interface';
import { ConsumerClientResponseInterface } from '~/contracts/consumer-client-response-interface';
import { ConsumerClientResponse } from '~/utils/consumer-client-response';

export class FakeConsumerClient implements ConsumerClientInterface {
    private consumeResponse!: ConsumerClientResponseInterface;

    public lastUri = '';

    public lastExpression = '';

    constructor(predefined: Record<string, string>) {
        this.setClientResponse(predefined);
    }

    public consume<ConsumerClientResponseInterface>(uri: string, expression: string): ConsumerClientResponseInterface {
        this.lastUri = uri;
        this.lastExpression = expression;

        return this.consumeResponse as unknown as ConsumerClientResponseInterface;
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
