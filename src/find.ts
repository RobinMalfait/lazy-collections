type Fn<T> = (input: T) => boolean;

export function find<T>(predicate: Fn<T>) {
  return function findFn(data: Iterable<T>): T | undefined {
    for (let datum of data) {
      if (predicate(datum)) {
        return datum;
      }
    }

    return undefined;
  };
}
