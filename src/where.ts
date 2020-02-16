import { filter } from './filter';

export function where<T>(properties: Record<string | number, any>) {
  return filter((datum: T) => {
    if (!(typeof datum === 'object' && datum !== null)) {
      return false;
    }

    return Object.entries(properties).every(([key, value]) => {
      return (datum as any)[key] === value;
    });
  });
}
