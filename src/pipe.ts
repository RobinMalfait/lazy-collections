type Fn = (...args: any) => any;

export function pipe(...fns: (Fn | Iterable<any>)[]): Fn {
  return fns.reduceRight((f, g) => (...args) => {
    const f_ = typeof f === 'function' ? f : () => f;
    const g_ = typeof g === 'function' ? g : () => g;
    return f_(g_(...args));
  }) as Fn;
}
