import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

export function concat<T>(
  ...data: MaybePromise<Iterable<T> | AsyncIterable<T>>[]
) {
  if (
    data.some(isAsyncIterable) ||
    data.some(datum => datum instanceof Promise)
  ) {
    return {
      async *[Symbol.asyncIterator]() {
        for await (let datum of await Promise.all(data)) {
          yield* datum;
        }
      },
    };
  }

  return {
    *[Symbol.iterator]() {
      for (let datum of data as Iterable<T>[]) {
        yield* datum;
      }
    },
  };
}
