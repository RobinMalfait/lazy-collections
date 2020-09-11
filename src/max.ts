import { reduce } from './reduce'

export function max() {
  return reduce((lhs, rhs) => Math.max(lhs, rhs), -Infinity)
}
