import { pipe } from './pipe';
import { compact } from './compact';
import { toArray } from './toArray';

it('should remove all falsey values', () => {
  const program = pipe(compact(), toArray());

  expect(
    program([0, 1, true, false, null, undefined, '', 'test', NaN])
  ).toEqual([1, true, 'test']);
});
