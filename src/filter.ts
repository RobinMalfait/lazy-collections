import { isAsyncIterable } from './utils/iterator';
import { LazyIterable } from './shared-types';

type Fn<T> = (datum: T) => boolean;

export function filter<T>(fn: Fn<T>) {
  return function filterFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data;

          for await (let datum of stream) {
            // Ignore values that do not meet the criteria
            if (!fn(datum)) {
              continue;
            }

            yield datum;
          }
        },
      };
    }

    return {
      *[Symbol.iterator]() {
        for (let datum of data as Iterable<T>) {
          // Ignore values that do not meet the criteria
          if (!fn(datum)) {
            continue;
          }

          yield datum;
        }
      },
    };
  };
}
