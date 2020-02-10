type Fn<T, R> = (datum: T) => R;

export function map<T, R>(fn: Fn<T, R>) {
  return function* mapFn(data: T[]) {
    for (let datum of data) {
      yield fn(datum);
    }
  };
}
