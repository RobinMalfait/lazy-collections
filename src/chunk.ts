import { isAsyncIterable } from './utils/iterator'
import { LazyIterable } from './shared-types'

export function chunk<T>(size: number) {
  return function chunkFn(data: LazyIterable<T>) {
    if (isAsyncIterable(data) || data instanceof Promise) {
      return {
        async *[Symbol.asyncIterator]() {
          const stream = data instanceof Promise ? await data : data

          // Let's have a placeholder for our current chunk
          let chunk = []

          // Loop over our data
          for await (let datum of stream) {
            // Add item to our current chunk
            chunk.push(datum)

            if (chunk.length === size) {
              // Our current chunk is full, let's yield it
              yield chunk

              // Let's also clear our chunk for the next chunk
              chunk = []
            }
          }

          // When the chunk is not full yet, but when we are at the end of the data we
          // have to ensure that this one is also yielded
          if (chunk.length > 0) yield chunk
        },
      }
    }

    return {
      *[Symbol.iterator]() {
        // Let's have a placeholder for our current chunk
        let chunk = []

        // Loop over our data
        for (let datum of data) {
          // Add item to our current chunk
          chunk.push(datum)

          if (chunk.length === size) {
            // Our current chunk is full, let's yield it
            yield chunk

            // Let's also clear our chunk for the next chunk
            chunk = []
          }
        }

        // When the chunk is not full yet, but when we are at the end of the data we
        // have to ensure that this one is also yielded
        if (chunk.length > 0) yield chunk
      },
    }
  }
}
