import { isAsyncIterable } from './utils/iterator';
import { LazyIterable } from './shared-types';

type Fn<T> = (input: T) => boolean;

export function some<T>(predicate: Fn<T>) {
  return function someFn(data: LazyIterable<T>): boolean | Promise<boolean> {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data;

        for await (let datum of stream) {
          if (predicate(datum)) {
            return true;
          }
        }

        return false;
      })();
    }

    for (let datum of data) {
      if (predicate(datum)) {
        return true;
      }
    }

    return false;
  };
}
