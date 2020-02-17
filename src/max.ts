export function max() {
  return function maxFn(data: number[]) {
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
