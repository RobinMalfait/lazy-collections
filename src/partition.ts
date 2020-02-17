type Fn<T> = (input: T) => boolean;

export function partition<T>(predicate: Fn<T>) {
  return function partitionFn(data: T[]): [T[], T[]] {
    let a = [];
    let b = [];

    for (let datum of data) {
      if (predicate(datum)) {
        a.push(datum);
      } else {
        b.push(datum);
      }
    }

    return [a, b];
  };
}
