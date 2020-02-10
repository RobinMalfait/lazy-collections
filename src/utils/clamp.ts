export function clamp(
  input: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
) {
  return Math.min(max, Math.max(min, input));
}
