import { isAsyncIterable } from './utils/iterator';
import { MaybePromise } from './shared-types';

type KeyFn<T> = (input: T) => string | number;

export function groupBy<T>(keySelector: KeyFn<T>) {
  return function groupByFn(
    data: MaybePromise<Iterable<T> | AsyncIterable<T>>
  ) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return (async () => {
        const stream = data instanceof Promise ? await data : data;
        let map: Record<ReturnType<typeof keySelector>, T[]> = {};
        for await (let datum of stream) {
          const key = keySelector(datum);
          if (map[key] === undefined) {
            map[key] = [];
          }

          map[key].push(datum);
        }

        return map;
      })();
    }

    let map: Record<ReturnType<typeof keySelector>, T[]> = {};
    for (let datum of data) {
      const key = keySelector(datum);
      if (map[key] === undefined) {
        map[key] = [];
      }

      map[key].push(datum);
    }

    return map;
  };
}
