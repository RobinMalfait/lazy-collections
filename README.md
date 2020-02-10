# Lazy Collections

```js
const program = pipe(
  map(x => x * 2),
  filter(x => x % 4 === 0),
  filter(x => x % 100 === 0),
  filter(x => x % 400 === 0),
  Array.from
);

program(range(0, 1_000_000));
```
