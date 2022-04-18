import { reduce } from './reduce'
import { LazyIterable } from './shared-types';

export function sum(data: LazyIterable<number>) {
  return reduce((total, current) => total + current, 0)(data)
}
