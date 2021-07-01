import { ConsumerClientResponseInterface } from '../Contracts/ConsumerClientResponseInterface';

export class ConsumerClientResponse implements ConsumerClientResponseInterface {

    private map!: Record<string, string | null>;

    public set(input: Record<string, string>): void
    {
        this.map = input;
    }

    public get(keyword: string): string
    {
        return this.map[keyword] ?? '';
    }

}