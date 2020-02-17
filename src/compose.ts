import { ensureFunction } from './utils/ensureFunction';

type Fn = (...args: any) => any;

export function compose<T>(
  fn: Fn | Iterable<T>,
  ...fns: (Fn | Iterable<T>)[]
): Fn {
  return fns.reduce((f: Fn, g) => {
    const g_ = ensureFunction(g);
    return (...args) => f(g_(...args));
  }, ensureFunction(fn));
}
