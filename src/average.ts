export function average<T extends number>() {
  return function averageFn(data: T[]) {
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
