import { filter } from './filter'
import { LazyIterable } from './shared-types';

export function compact<T>(data: LazyIterable<T>) {
  return filter<T>(Boolean)(data)
}
