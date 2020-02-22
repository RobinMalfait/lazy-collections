import { pipe } from './pipe';
import { range } from './range';
import { find } from './find';
import { delay } from './delay';

it('should find a value in the stream', () => {
  const program = pipe(find(x => x === 2));

  expect(program(range(0, 100))).toEqual(2);
  expect(program(range(0, 100))).toEqual(2);
});

it('should return undefined when the value is not found', () => {
  const program = pipe(find(x => x === 101));

  expect(program(range(0, 100))).toEqual(undefined);
  expect(program(range(0, 100))).toEqual(undefined);
});

it('should find a value in the stream (async)', async () => {
  const program = pipe(
    delay(0),
    find(x => x === 2)
  );

  expect(await program(range(0, 100))).toEqual(2);
  expect(await program(range(0, 100))).toEqual(2);
});

it('should return undefined when the value is not found (async)', async () => {
  const program = pipe(
    delay(0),
    find(x => x === 101)
  );

  expect(await program(range(0, 100))).toEqual(undefined);
  expect(await program(range(0, 100))).toEqual(undefined);
});

it('should find a value in the stream (Promise async)', async () => {
  const program = pipe(find(x => x === 2));

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(2);
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(2);
});

it('should return undefined when the value is not found (Promise async)', async () => {
  const program = pipe(find(x => x === 101));

  expect(await program(Promise.resolve(range(0, 100)))).toEqual(undefined);
  expect(await program(Promise.resolve(range(0, 100)))).toEqual(undefined);
});
