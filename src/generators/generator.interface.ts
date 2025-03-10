export interface Generator<R extends { [K in keyof R]: string | string[] }> {
  generate(): Promise<R>;
}
