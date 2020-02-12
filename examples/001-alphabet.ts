import { pipe, map, range } from '..';

const alphabet = pipe(
  range(0, 25),
  map((x: number) => String.fromCharCode(x + 65)),
  Array.from
);

alphabet(); // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
