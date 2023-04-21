import { reduce } from './'

export function sum() {
  return reduce((total, current) => total + current, 0)
}
