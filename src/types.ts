export type CfdiStatusRawResponse = Record<string, string | null | undefined>;

export interface ConsumerClientResponseInterface {
  /**
   * Retrieve a value from a given keyword
   * This method should not throw any exception,
   * if keyword was not set previously it must return an empty string
   */
  get(keyword: string): string;

  raw(): CfdiStatusRawResponse;
}

export interface ConsumerClientInterface {
  consume(uri: string, expression: string): Promise<ConsumerClientResponseInterface>;
}

export type OmitPrototype<T> = { [K in keyof T as K extends 'prototype' ? never : K]: T[K] };

export type EnumLike<T> = T[keyof OmitPrototype<T>];
