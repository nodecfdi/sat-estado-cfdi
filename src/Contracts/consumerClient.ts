interface ConsumerClientInterface {
    consume(uri: string, expression: string): ConsumerClientResponseInterface;
}