type Fn = (...args: any) => any;

export function ensureFunction(input: any): Fn {
  return typeof input === 'function' ? input : () => input;
}
