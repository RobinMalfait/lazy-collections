import { pipe } from './pipe'
import { range } from './range'
import { min } from './min'
import { delay } from './delay'

it('should find the min value of the iterator', () => {
  const program = pipe(range(5, 10), min())

  expect(program()).toEqual(5)
})

it('should find the min value of the iterator (async)', async () => {
  const program = pipe(range(5, 10), delay(0), min())

  expect(await program()).toEqual(5)
})
