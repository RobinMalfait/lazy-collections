import { pipe, compact, toArray, delay } from './'

it('should remove all falsey values', () => {
  let program = pipe(compact(), toArray())

  expect(program([0, 1, true, false, null, undefined, '', 'test', NaN])).toEqual([1, true, 'test'])
  expect(program([0, 1, true, false, null, undefined, '', 'test', NaN])).toEqual([1, true, 'test'])
})

it('should remove all falsey values (async)', async () => {
  let program = pipe(delay(0), compact(), toArray())

  expect(await program([0, 1, true, false, null, undefined, '', 'test', NaN])).toEqual([
    1,
    true,
    'test',
  ])
  expect(await program([0, 1, true, false, null, undefined, '', 'test', NaN])).toEqual([
    1,
    true,
    'test',
  ])
})

it('should remove all falsey values (Promise async)', async () => {
  let program = pipe(compact(), toArray())

  expect(
    await program(Promise.resolve([0, 1, true, false, null, undefined, '', 'test', NaN]))
  ).toEqual([1, true, 'test'])
  expect(
    await program(Promise.resolve([0, 1, true, false, null, undefined, '', 'test', NaN]))
  ).toEqual([1, true, 'test'])
})
