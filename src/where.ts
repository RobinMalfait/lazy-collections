import { filter } from './filter';

export function where<T>(properties: Record<string | number, any>) {
  const entries = Object.entries(properties);

  return filter<T>(datum => {
    if (!(typeof datum === 'object' && datum !== null)) {
      return false;
    }

    return entries.every(([key, value]) => (datum as any)[key] === value);
  });
}
