import { reduce } from './reduce';

export function min() {
  return reduce(Math.min, Infinity);
}
