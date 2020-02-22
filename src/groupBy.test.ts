import { pipe } from './pipe';
import { range } from './range';
import { groupBy } from './groupBy';
import { delay } from './delay';

function snap(multitude: number, value: number) {
  return Math.ceil(value / multitude) * multitude;
}

it('should be possible to group an iterator by something', () => {
  const program = pipe(
    range(0, 10),
    groupBy((x: number) => snap(5, x))
  );

  expect(program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  });
});

it('should be possible to group an iterator by something (async)', async () => {
  const program = pipe(
    range(0, 10),
    delay(0),
    groupBy((x: number) => snap(5, x))
  );

  expect(await program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  });
});

it('should be possible to group an iterator by something (Promise async)', async () => {
  const program = pipe(
    Promise.resolve(range(0, 10)) as any,
    groupBy((x: number) => snap(5, x))
  );

  expect(await program()).toEqual({
    0: [0],
    5: [1, 2, 3, 4, 5],
    10: [6, 7, 8, 9, 10],
  });
});
