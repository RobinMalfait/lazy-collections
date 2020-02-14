export function toArray<T>() {
  return function toArrayFn(data: T[]): T[] {
    return Array.from(data);
  };
}
