type Fn<T> = (datum: T) => void;

export function tap<T>(fn: Fn<T>) {
  return function* tapFn(data: Iterable<T>) {
    for (let datum of data) {
      fn(datum);
      yield datum;
    }
  };
}
