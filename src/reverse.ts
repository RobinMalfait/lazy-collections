export function reverse<T>() {
  return function* reverseFn(data: T[]) {
    /**
     * This is pretty slow because it has to first go through the whole iterator
     * (to make it an array), then reverse the whole thing and then start
     * yielding again.
     */
    for (let datum of Array.from(data).reverse()) {
      yield datum;
    }
  };
}
