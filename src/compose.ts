type Fn = (...args: any) => any;

export function compose(...fns: (Fn | Iterable<any>)[]): Fn {
  return fns.reduce((f, g) => (...args) => {
    const f_ = typeof f === 'function' ? f : () => f;
    const g_ = typeof g === 'function' ? g : () => g;
    return f_(g_(...args));
  }) as Fn;
}
