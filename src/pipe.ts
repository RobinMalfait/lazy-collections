type Fn = (...args: any) => any;

function ensureFunction(input: any): Fn {
  return typeof input === 'function' ? input : () => input;
}

export function pipe(...fns: (Fn | Iterable<any>)[]): Fn {
  const fn = fns.pop();
  return fns.reduceRight((f: Fn, g) => {
    const g_ = ensureFunction(g);
    return (...args) => f(g_(...args));
  }, ensureFunction(fn));
}
