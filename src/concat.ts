export function* concat<T>(...data: Iterable<T>[]) {
  for (let datum of data) {
    yield* datum;
  }
}
