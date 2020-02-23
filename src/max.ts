import { reduce } from './reduce';

export function max() {
  return reduce(Math.max, -Infinity);
}
