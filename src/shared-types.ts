export type MaybePromise<T> = T | Promise<T>;

export type LazyIterable<T> = MaybePromise<Iterable<T> | AsyncIterable<T>>;
