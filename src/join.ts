import { reduce } from './reduce'

export function join(separator: string = '') {
  return reduce((joined, current, index) => index === 0 ? current : joined + separator + current, '')
}
