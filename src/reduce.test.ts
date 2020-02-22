import { reduce } from './reduce';
import { pipe } from './pipe';
import { delay } from './delay';

it('should be possible to sum numbers (via reduce)', () => {
  const program = reduce((total, current) => total + current, 0);
  expect(program([1, 2, 3])).toEqual(6);
  expect(program([1, 2, 3])).toEqual(6);
});

it('should be possible to sum numbers (via reduce) (async)', async () => {
  const program = pipe(
    delay(0),
    reduce((total, current) => total + current, 0)
  );
  expect(await program([1, 2, 3])).toEqual(6);
  expect(await program([1, 2, 3])).toEqual(6);
});

it('should be possible to sum numbers (via reduce) (Promise async)', async () => {
  const program = pipe(reduce((total, current) => total + current, 0));

  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(6);
  expect(await program(Promise.resolve([1, 2, 3]))).toEqual(6);
});
