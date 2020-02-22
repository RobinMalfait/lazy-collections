export function isIterable<T>(input: any): input is Iterable<T> {
  if (typeof input !== 'object' || input === null) {
    return false;
  }

  return input[Symbol.iterator] !== undefined;
}

export function isAsyncIterable<T>(input: any): input is AsyncIterable<T> {
  if (typeof input !== 'object' || input === null) {
    return false;
  }

  return input[Symbol.asyncIterator] !== undefined;
}
