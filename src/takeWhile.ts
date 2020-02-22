import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

type Fn<T> = (datum: T) => boolean;

export function takeWhile<T>(fn: Fn<T>) {
  return function takeWhileFn(
    data: MaybePromise<Iterable<T> | AsyncIterable<T>>
  ) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data;

          for await (let datum of stream) {
            if (!fn(datum)) {
              return;
            }

            yield datum;
          }
        },
      };
    }

    return {
      *[Symbol.iterator]() {
        for (let datum of data) {
          if (!fn(datum)) {
            return;
          }

          yield datum;
        }
      },
    };
  };
}
