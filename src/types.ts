export interface ConsumerClientResponseInterface {
  /**
   * Retrieve a value from a given keyword
   * This method should not throw any exception,
   * if keyword was not set previously it must return an empty string
   */
  get(keyword: string): string;

  raw(): Record<string, string | null>;
}

export interface ConsumerClientInterface {
  consume(uri: string, expression: string): Promise<ConsumerClientResponseInterface>;
}
