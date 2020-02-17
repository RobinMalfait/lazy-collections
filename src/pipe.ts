import { ensureFunction } from './utils/ensureFunction';

type Fn = (...args: any) => any;

export function pipe<T>(...fns: (Fn | Iterable<T>)[]): Fn {
  const fn = fns.pop();
  return fns.reduceRight((f: Fn, g) => {
    const g_ = ensureFunction(g);
    return (...args) => f(g_(...args));
  }, ensureFunction(fn));
}
