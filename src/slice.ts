export function slice<T>(begin = 0, end = Infinity) {
  return function* sliceFn(data: Iterable<T>) {
    const iterator = Array.isArray(data)
      ? (data[Symbol.iterator]() as IterableIterator<T>)
      : (data as IterableIterator<T>);

    let local_begin = begin;
    let local_end = end - local_begin;

    // Skip the first X values
    while (local_begin-- > 0) {
      iterator.next();
    }

    // Loop through the remaining items until the end is reached
    for (let datum of iterator) {
      yield datum;

      if (--local_end < 0) {
        return;
      }
    }
  };
}
