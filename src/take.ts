import { slice } from './'

export function take<T>(amount: number) {
  return slice<T>(0, Math.max(0, amount - 1))
}
