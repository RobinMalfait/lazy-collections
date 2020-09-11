export function* generate<T>(generator: () => T) {
  while (true) {
    yield generator()
  }
}
