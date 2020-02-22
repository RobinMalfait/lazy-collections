import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

type Fn<T> = (input: T) => boolean;

export function find<T>(predicate: Fn<T>) {
  return function findFn(
    data: MaybePromise<Iterable<T> | AsyncIterable<T>>
  ): (T | undefined) | Promise<T | undefined> {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data;

        for await (let datum of stream) {
          if (predicate(datum)) {
            return datum;
          }
        }

        return undefined;
      })();
    }

    for (let datum of data) {
      if (predicate(datum)) {
        return datum;
      }
    }

    return undefined;
  };
}
