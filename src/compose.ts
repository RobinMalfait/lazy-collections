import { ensureFunction } from './utils/ensureFunction'
import { LazyIterable } from './shared-types'

type Fn = (...args: any) => any

export function compose<T>(fn: Fn | LazyIterable<T>, ...fns: (Fn | LazyIterable<T>)[]): Fn {
  return fns.reduce((f: Fn, g) => {
    const g_ = ensureFunction(g)
    return (...args) => f(g_(...args))
  }, ensureFunction(fn))
}
