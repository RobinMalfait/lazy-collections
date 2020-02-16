import { filter } from './filter';

export function compact() {
  return filter(Boolean);
}
