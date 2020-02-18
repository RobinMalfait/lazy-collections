import { map } from './map';

type Fn<T> = (datum: T) => void;

export function tap<T>(fn: Fn<T>) {
  return map<T, T>((datum: T) => {
    fn(datum);
    return datum;
  });
}
