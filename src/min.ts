import { reduce } from './reduce'
import { LazyIterable } from './shared-types';

export function min(data: LazyIterable<number>) {
  return reduce((lhs, rhs) => Math.min(lhs, rhs), Infinity)(data)
}
