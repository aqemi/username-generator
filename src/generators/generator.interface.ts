export interface Generator<R extends { [K in keyof R]: string }> {
  generate(): Promise<R>;
}
