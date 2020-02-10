type Options = {
  deep?: boolean;
};

export function flatten(options: Options = {}) {
  const { deep = false } = options;

  return function* flattenFn<T>(data: T[]): any {
    if (!Array.isArray(data) && !data[Symbol.iterator]) {
      yield data;
    } else {
      for (let datum of data) {
        if (deep) {
          yield* flattenFn(datum as any);
        } else {
          if ((datum as any)[Symbol.iterator]) {
            yield* datum as any;
          } else {
            yield datum;
          }
        }
      }
    }
  };
}
