export function max<T extends number>() {
  return function maxFn(data: T[]) {
    let max: number | undefined = undefined;
    for (let datum of data) {
      if (max === undefined) {
        max = datum;
        continue;
      }
      max = Math.max(max, datum);
    }
    return max;
  };
}
