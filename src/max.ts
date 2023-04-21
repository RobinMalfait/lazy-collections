import { reduce } from './'

export function max() {
  return reduce((lhs, rhs) => Math.max(lhs, rhs), -Infinity)
}
