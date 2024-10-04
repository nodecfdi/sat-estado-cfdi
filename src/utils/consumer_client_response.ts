import { type CfdiStatusRawResponse, type ConsumerClientResponseInterface } from '#src/types';

/**
 * This is a generic implementation of ConsumerClientResponseInterface
 * You can use it, or you can create your own implementation as your convenience.
 */
export default class ConsumerClientResponse implements ConsumerClientResponseInterface {
  public constructor(private readonly _map: CfdiStatusRawResponse) {}

  public get(keyword: string): string {
    return this._map[keyword] ?? '';
  }

  public raw(): CfdiStatusRawResponse {
    return this._map;
  }
}
