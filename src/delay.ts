import { LazyIterable } from './shared-types'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function delay<T>(ms: number) {
  return async function* delayFn(data: LazyIterable<T>) {
    if (data == null) return

    let stream = data instanceof Promise ? await data : data

    for await (let datum of stream) {
      if (ms !== 0) await sleep(ms)
      yield datum
    }
  }
}

// Looks like a no-op, but will resolve the promises. It's just a bit nicer to see `pipe(map(() =>
// fetch()), wait(), toArray())` than `pipe(map(() => fetch()), delay(0), toArray())`. Because the
// `toArray()` will _not_ wait/resolve the promises, otherwise you can't map to an array of promises
// anymore.
export function wait() {
  return delay(0)
}
