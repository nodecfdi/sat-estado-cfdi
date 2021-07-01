export interface ConsumerClientResponseInterface {
    /**
     * Store a pair of keyword value
     */
     set(input: Record<string, string  | null>): void;

     /**
      * Retrieve a value from a given keyword
      * This method sould not throw any exception, if keyword was not set previously it must return an empty string
      */
     get(keyword: string ): string;
}