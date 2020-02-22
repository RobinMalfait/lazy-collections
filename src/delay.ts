function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function delay<T>(ms: number) {
  return async function* delayFn(data: Iterable<T> | AsyncIterable<T>) {
    if (data == null) {
      return;
    }

    for await (let datum of data) {
      await sleep(ms);
      yield datum;
    }
  };
}
