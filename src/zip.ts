export function zip<T>() {
  return function* zipFn(data: Iterable<Iterable<T>>) {
    // Map each item of `data` to an iterator
    let iterators = Array.from(data).map(datum => datum[Symbol.iterator]())

    while (true) {
      // Take the next value of each iterator
      let values = iterators.map(datum => datum.next())

      // Stop once some values are done
      if (values.some(value => value.done)) return

      // Yield the actual values zipped together
      yield values.map(value => value.value)
    }
  }
}
