import { type ConsumerClientResponseInterface } from '../contracts/consumer-client-response-interface';

export class ConsumerClientResponse implements ConsumerClientResponseInterface {
  private map!: Record<string, string | null>;

  public set(input: Record<string, string | null>): void {
    this.map = input;
  }

  public get(keyword: string): string {
    return this.map[keyword] ?? '';
  }

  public raw(): Record<string, string | null> {
    return this.map;
  }
}
