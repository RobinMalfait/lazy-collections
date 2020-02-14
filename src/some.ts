type Fn<T> = (input: T) => boolean;

export function some<T>(predicate: Fn<T>) {
  return function someFn(data: T[]): boolean {
    for (let datum of data) {
      if (predicate(datum)) {
        return true;
      }
    }

    return false;
  };
}
