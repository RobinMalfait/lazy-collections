type Fn = (...args: any) => any;

function ensureFunction(input: any): Fn {
  return typeof input === 'function' ? input : () => input;
}

export function compose(
  fn: Fn | Iterable<any>,
  ...fns: (Fn | Iterable<any>)[]
): Fn {
  return fns.reduce((f: Fn, g) => {
    const g_ = ensureFunction(g);
    return (...args) => f(g_(...args));
  }, ensureFunction(fn));
}
