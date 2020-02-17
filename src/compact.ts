import { filter } from './filter';

export function compact<T>() {
  return filter<T>(Boolean);
}
