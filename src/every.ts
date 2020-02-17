type Fn<T> = (input: T) => boolean;

export function every<T>(predicate: Fn<T>) {
  return function everyFn(data: Iterable<T>): boolean {
    for (let datum of data) {
      if (!predicate(datum)) {
        return false;
      }
    }

    return true;
  };
}
