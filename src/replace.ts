import { map } from './map'

export function replace<T>(index: number, value: T) {
  return map<T, T>((item, i) => (i === index ? value : item))
}
