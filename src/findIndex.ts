type Fn<T> = (input: T) => boolean;

export function findIndex<T>(predicate: Fn<T>) {
  return function findIndexFn(data: T[]): number {
    let i = 0;
    for (let datum of data) {
      if (predicate(datum)) {
        return i;
      }
      i++;
    }

    return -1;
  };
}
