import { isAsyncIterable } from './utils/iterator';
import { LazyIterable } from './shared-types';

type Fn<T, R> = (datum: T) => R;

export function map<T, R>(fn: Fn<T, R>) {
  return function mapFn(data: LazyIterable<T>) {
    if (data == null) {
      return;
    }

    // Handle the async version
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data;

          for await (let datum of stream) {
            yield fn(datum);
          }
        },
      };
    }

    // Handle the sync version
    return {
      *[Symbol.iterator]() {
        for (let datum of data) {
          yield fn(datum);
        }
      },
    };
  };
}
