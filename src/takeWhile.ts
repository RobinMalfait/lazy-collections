type Fn<T> = (datum: T) => boolean;

export function takeWhile<T>(fn: Fn<T>) {
  return function* takeWhileFn(data: Iterable<T>) {
    for (let datum of data) {
      if (!fn(datum)) {
        return;
      }

      yield datum;
    }
  };
}
