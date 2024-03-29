import { clamp } from './utils/clamp'

export function* range(lowerbound: number, upperbound: number, step: number = 1) {
  let fixed_step = clamp(
    lowerbound < upperbound ? (step > 0 ? step : -step) : step > 0 ? -step : step
  )

  let lowerbound_ = clamp(lowerbound)
  let upperbound_ = clamp(upperbound)

  for (
    let i = lowerbound_;
    lowerbound_ < upperbound_ ? i <= upperbound_ : i >= upperbound_;
    i += fixed_step
  ) {
    yield i
  }
}
