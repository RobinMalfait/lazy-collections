import { slice } from './slice';

export function take(amount: number) {
  return slice(0, Math.max(0, amount - 1));
}
