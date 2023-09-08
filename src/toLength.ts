import { reduce } from './reduce'

export function toLength() {
  return reduce((acc) => acc + 1, 0)
}
