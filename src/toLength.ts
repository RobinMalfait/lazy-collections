import { reduce } from './reduce'

export function toLength() {
  return reduce((_value, acc) => acc + 1, 0)
}
