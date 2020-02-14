export function min<T extends number>() {
  return function minFn(data: T[]) {
    let min: number | undefined = undefined;
    for (let datum of data) {
      if (min === undefined) {
        min = datum;
        continue;
      }
      min = Math.min(min, datum);
    }
    return min;
  };
}
