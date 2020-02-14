export function slice<T>(begin = 0, end = Infinity) {
  return function* sliceFn(data: T[]) {
    const iterator = data[Symbol.iterator]();
    let actual_end = end - begin;

    // Skip the first X values
    while (begin-- > 0) {
      iterator.next();
    }

    // Loop through the remaining items until the end is reached
    for (let datum of iterator) {
      if (--actual_end < 0) {
        yield datum;
        return;
      }

      yield datum;
    }
  };
}
