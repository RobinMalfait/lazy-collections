export function windows<T>(size: number) {
  return function* windowsFn(data: Iterable<T>) {
    let result: T[] = []

    for (let item of data) {
      result.push(item)

      if (result.length === size) {
        yield result.slice(-size)
        result.shift()
      }
    }

    result.splice(0)
  }
}
