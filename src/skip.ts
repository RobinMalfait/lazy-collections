import { slice } from './slice';

export function skip(amount: number) {
  return slice(Math.max(0, amount));
}
