type Fn = (...args: any) => any;

export function compose(...fns: Fn[]) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}
