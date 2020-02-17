export function toArray<T>() {
  return function toArrayFn(data: Iterable<T>): T[] {
    return Array.from(data);
  };
}
