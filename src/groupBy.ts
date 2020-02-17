type KeyFn<T> = (input: T) => string | number;

export function groupBy<T>(keySelector: KeyFn<T>) {
  return function groupByFn(data: Iterable<T>) {
    let map: Record<ReturnType<typeof keySelector>, T[]> = {};
    for (let datum of data) {
      const key = keySelector(datum);
      if (map[key] === undefined) {
        map[key] = [];
      }

      map[key].push(datum);
    }

    return map;
  };
}
