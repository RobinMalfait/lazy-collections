import { MaybePromise } from './shared-types';
import { isAsyncIterable, isIterable } from './utils/iterator';

type Options = {
  shallow?: boolean;
};

export function flatten<T>(options: Options = {}) {
  const { shallow = false } = options;

  return function flattenFn(
    data: MaybePromise<Iterable<T> | AsyncIterable<T>>
  ): any {
    if (data == null) {
      return;
    }

    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data;

          for await (let datum of stream) {
            if (shallow) {
              // If the value itself is an iterator, we have to flatten that as
              // well.
              if (isAsyncIterable(datum)) {
                yield* datum;
              } else {
                yield datum;
              }
            } else {
              // Let's go recursive
              yield* await flattenFn(datum as any);
            }
          }
        },
      };
    }

    return {
      *[Symbol.iterator]() {
        if (!Array.isArray(data)) {
          yield data;
        } else {
          for (let datum of data) {
            if (shallow) {
              // If the value itself is an iterator, we have to flatten that as
              // well.
              if (isIterable(datum)) {
                yield* datum;
              } else {
                yield datum;
              }
            } else {
              // Let's go recursive
              yield* flattenFn(datum);
            }
          }
        }
      },
    };
  };
}
