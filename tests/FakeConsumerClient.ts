import { ConsumerClientInterface } from '../src/Contracts/ConsumerClientInterface';
import { ConsumerClientResponseInterface } from '../src/Contracts/ConsumerClientResponseInterface';
import { ConsumerClientResponse } from '../src/Utils/ConsumerClientResponse';

export class FakeConsumerClient implements ConsumerClientInterface {

    private consumeResponse!: ConsumerClientResponseInterface;

    public lastUri: string = '';

    public lastExpression: string = '';

    constructor(predefined: Record<string, string>) {
        this.setClientResponse(predefined);
    }

    public consume(uri: string, expression: string): ConsumerClientResponseInterface
    {
        this.lastUri = uri;
        this.lastExpression = expression;
        return this.consumeResponse;
    }

    public setClientResponse(predefined: Record<string, string>): void
    {
        this.consumeResponse = FakeConsumerClient.consumerClientResponseFromArray(predefined);
    }

    public static consumerClientResponseFromArray(input: Record<string, string>): ConsumerClientResponseInterface
    {
        const consumeResponse = new ConsumerClientResponse();
        consumeResponse.set(input);
        return consumeResponse;
    }
}
