export function* concat(...data: Iterable<any>[]) {
  for (let datum of data) {
    yield* datum;
  }
}
