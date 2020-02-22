import { MaybePromise } from './shared-types';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function delay<T>(ms: number) {
  return async function* delayFn(
    data: MaybePromise<Iterable<T> | AsyncIterable<T>>
  ) {
    if (data == null) {
      return;
    }

    const stream = data instanceof Promise ? await data : data;

    for await (let datum of stream) {
      await sleep(ms);
      yield datum;
    }
  };
}
