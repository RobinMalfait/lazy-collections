export function head<T>() {
  return function headFn(data: Iterable<T>): T | undefined {
    if (data == null || (!Array.isArray(data) && !data[Symbol.iterator])) {
      return undefined;
    }

    for (let datum of data) {
      return datum;
    }

    return undefined;
  };
}

// Alias
export const first = head;
