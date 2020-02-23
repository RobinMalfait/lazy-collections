import { pipe } from './pipe';
import { compact } from './compact';
import { toArray } from './toArray';
import { delay } from './delay';

it('should remove all falsey values', () => {
  const program = pipe(compact(), toArray());

  expect(
    program([0, 1, true, false, null, undefined, '', 'test', NaN])
  ).toEqual([1, true, 'test']);
  expect(
    program([0, 1, true, false, null, undefined, '', 'test', NaN])
  ).toEqual([1, true, 'test']);
});

it('should remove all falsey values (async)', async () => {
  const program = pipe(delay(0), compact(), toArray());

  expect(
    await program([0, 1, true, false, null, undefined, '', 'test', NaN])
  ).toEqual([1, true, 'test']);
  expect(
    await program([0, 1, true, false, null, undefined, '', 'test', NaN])
  ).toEqual([1, true, 'test']);
});

it('should remove all falsey values (Promise async)', async () => {
  const program = pipe(compact(), toArray());

  expect(
    await program(
      Promise.resolve([0, 1, true, false, null, undefined, '', 'test', NaN])
    )
  ).toEqual([1, true, 'test']);
  expect(
    await program(
      Promise.resolve([0, 1, true, false, null, undefined, '', 'test', NaN])
    )
  ).toEqual([1, true, 'test']);
});
