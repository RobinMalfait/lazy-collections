import { pipe, generate, take, toArray } from '..';

const randomNumberGenerator = pipe(generate(Math.random), take(3), toArray());

randomNumberGenerator();
// [ 0.973565686837264, 0.7129324120429745, 0.10387686881346947 ]
