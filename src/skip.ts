import { slice } from './'

export function skip<T>(amount: number) {
  return slice<T>(Math.max(0, amount))
}
