export function isIterable<T>(input: any): input is Iterable<T> {
  if (typeof input !== 'object' || input === null) return false
  return input[Symbol.iterator] !== undefined
}

export function isAsyncIterable<T>(input: any): input is AsyncIterable<T> {
  if (typeof input !== 'object' || input === null) return false
  return input[Symbol.asyncIterator] !== undefined
}

export function getIterator<T>(
  input: Iterable<T> | AsyncIterable<T>
): Iterator<T> | AsyncIterator<T> {
  if (isAsyncIterable(input)) {
    return input[Symbol.asyncIterator]()
  }

  if (isIterable(input)) {
    return input[Symbol.iterator]()
  }

  throw new Error('`input` is not an iterable')
}
