import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

type Fn<T> = (input: T) => boolean;

export function every<T>(predicate: Fn<T>) {
  return function everyFn(data: MaybePromise<Iterable<T> | AsyncIterable<T>>) {
    if (data == null) {
      return;
    }

    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data;

        for await (let datum of stream) {
          if (!predicate(datum)) {
            return false;
          }
        }

        return true;
      })();
    }

    for (let datum of data) {
      if (!predicate(datum)) {
        return false;
      }
    }

    return true;
  };
}
