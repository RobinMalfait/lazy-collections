export function average() {
  return function averageFn(data: number[]) {
    let sum = 0;
    let count = 0;

    for (let datum of data) {
      sum += datum;
      count++;
    }

    return sum / count;
  };
}

// Alias
export const mean = average;
