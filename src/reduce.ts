type Fn<T, R = T> = (acc: R, datum: T) => R;

export function reduce<R, T = R>(fn: Fn<T, R>, initial: R) {
  return function reduceFn(data: Iterable<T>) {
    let acc = initial;
    for (let datum of data) {
      acc = fn(acc, datum);
    }
    return acc;
  };
}
