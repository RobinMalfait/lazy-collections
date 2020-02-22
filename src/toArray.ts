import { reduce } from './reduce';
import { MaybePromise } from './shared-types';

export function toArray<T>() {
  return (data: MaybePromise<Iterable<T> | AsyncIterable<T>>) => {
    return reduce<T[], T>((acc, current) => {
      acc.push(current);
      return acc;
    }, [])(data);
  };
}
