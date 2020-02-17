export function min() {
  return function minFn(data: number[]) {
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
