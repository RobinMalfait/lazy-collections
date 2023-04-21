import { reduce } from './'

export function product() {
  return reduce((total, current) => total * current, 1)
}
