type Options = {
  shallow?: boolean;
};

export function flatten<T>(options: Options = {}) {
  const { shallow = false } = options;

  return function* flattenFn(data: T[]): any {
    if (!Array.isArray(data) && !data[Symbol.iterator]) {
      yield data;
    } else {
      for (let datum of data) {
        if (shallow) {
          // If the value itself is an iterator, we have to flatten that as
          // well.
          if ((datum as any)[Symbol.iterator]) {
            yield* datum as any;
          } else {
            yield datum;
          }
        } else {
          // Let's go recursive
          yield* flattenFn(datum as any);
        }
      }
    }
  };
}
