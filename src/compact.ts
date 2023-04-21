import { filter } from './'

export function compact<T>() {
  return filter<T>(Boolean)
}
