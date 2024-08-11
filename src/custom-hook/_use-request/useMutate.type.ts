export type MutateParams<T> = {
  request: (option: MutateRequestFunctionParams<T>) => Promise<T | undefined>
}

export type MutateRequestFunctionParams<T> = {
  deps: string
  state: T | undefined
  removeCache: (key: string) => void
}
