import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

export function unique<T>() {
  return function uniqueFn(data: MaybePromise<Iterable<T> | AsyncIterable<T>>) {
    const seen = new Set<T>([]);

    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data;

          for await (let datum of stream) {
            if (!seen.has(datum)) {
              seen.add(datum);
              yield datum;
            }
          }
        },
      };
    }

    return {
      *[Symbol.iterator]() {
        for (let datum of data) {
          if (!seen.has(datum)) {
            seen.add(datum);
            yield datum;
          }
        }
      },
    };
  };
}
