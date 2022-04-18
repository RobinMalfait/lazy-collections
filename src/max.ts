import { reduce } from './reduce'
import { LazyIterable } from './shared-types';

export function max(data: LazyIterable<number>) {
  return reduce((lhs, rhs) => Math.max(lhs, rhs), -Infinity)(data)
}
