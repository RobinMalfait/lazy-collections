import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

type Fn<T, R = T> = (acc: R, datum: T) => R;

export function reduce<R, T = R>(fn: Fn<T, R>, initial: R) {
  return function reduceFn(data: MaybePromise<Iterable<T> | AsyncIterable<T>>) {
    let acc = initial;

    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data;
        for await (let datum of stream) {
          acc = fn(acc, datum);
        }
        return acc;
      })();
    }

    for (let datum of data) {
      acc = fn(acc, datum);
    }
    return acc;
  };
}
