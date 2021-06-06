import { ensureFunction } from './utils/ensureFunction'
import { LazyIterable } from './shared-types'

type Fn = (...args: any) => any

export function pipe<T>(...fns: (Fn | LazyIterable<T>)[]): Fn {
  return fns.reduceRight((f: Fn, g) => {
    let g_ = ensureFunction(g)
    return (...args) => f(g_(...args))
  }, ensureFunction(fns.pop()))
}
