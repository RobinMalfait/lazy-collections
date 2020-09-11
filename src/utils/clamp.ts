export function clamp(input: number, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.min(max, Math.max(min, input))
}
