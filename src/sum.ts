import { reduce } from './reduce';

export function sum() {
  return reduce((total, current) => total + current, 0);
}
