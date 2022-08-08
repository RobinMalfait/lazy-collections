import { pipe } from './pipe'
import { toArray } from './toArray'
import { windows } from './windows'

it('should result in a sliding window', () => {
  let program = pipe(windows(2), toArray())

  expect(program(['w', 'i', 'n', 'd', 'o', 'w', 's'])).toEqual([
    ['w', 'i'],
    ['i', 'n'],
    ['n', 'd'],
    ['d', 'o'],
    ['o', 'w'],
    ['w', 's'],
  ])
})
