export function unique<T>() {
  return function* uniqueFn(data: Iterable<T>) {
    const seen = new Set<T>([]);
    for (let datum of data) {
      if (!seen.has(datum)) {
        seen.add(datum);
        yield datum;
      }
    }
  };
}
