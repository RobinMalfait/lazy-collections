import { reduce } from './reduce';

export function min() {
  return reduce((lhs, rhs) => Math.min(lhs, rhs), Infinity);
}
