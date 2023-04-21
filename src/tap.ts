import { map } from './'

type Fn<T> = (datum: T, index: number) => void

export function tap<T>(fn: Fn<T>) {
  return map<T, T>((datum: T, index) => {
    fn(datum, index)
    return datum
  })
}
