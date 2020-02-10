type Fn = (...args: any) => any;

export function pipe(...fns: Fn[]) {
  return fns.reduceRight((f, g) => (...args) => f(g(...args)));
}
