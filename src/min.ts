import { reduce } from './'

export function min() {
  return reduce((lhs, rhs) => Math.min(lhs, rhs), Infinity)
}
