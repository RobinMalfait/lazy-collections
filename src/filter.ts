type Fn<T> = (datum: T) => boolean;

export function filter<T>(fn: Fn<T>) {
  return function* filterFn(data: T[]) {
    for (let datum of data) {
      // Ignore values that do not meet the criteria
      if (!fn(datum)) {
        continue;
      }

      yield datum;
    }
  };
}
