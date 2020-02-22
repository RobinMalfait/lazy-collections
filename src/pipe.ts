import { ensureFunction } from './utils/ensureFunction';

type Fn = (...args: any) => any;

export function pipe<T>(...fns: (Fn | Iterable<T> | AsyncIterable<T>)[]): Fn {
  return fns.reduceRight((f: Fn, g) => {
    const g_ = ensureFunction(g);
    return (...args) => f(g_(...args));
  }, ensureFunction(fns.pop()));
}
