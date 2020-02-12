# Lazy Collections ![Node CI](https://github.com/RobinMalfait/lazy-collections/workflows/Node%20CI/badge.svg)

Working with methods like `.map()`, `.filter()` and `.reduce()` are nice,
however they create new arrays and everything is eagerly done before going to
the next step.

This is where lazy collections come in, under the hood we use generators so that
your data flows like a stream to have the optimal speed.

```js
const program = pipe(
  map(x => x * 2),
  filter(x => x % 4 === 0),
  filter(x => x % 100 === 0),
  filter(x => x % 400 === 0),
  Array.from
);

program(range(0, 1000000));
```

## API

> In a lot of the examples I will use the `Array.from` as a function, because it
> will convert an iterator to an actual array.

### `compose`

We can use compose to compose functions together and return a new function which
combines all other functions.

```js
import { compose } from 'lazy-collections';

// Create a program (or a combination of functions)
const program = compose(fn1, fn2, fn3);

program();
// fn1(fn2(fn3()))
```

### `pipe`

We can use pipe to compose functions together and return a new function which
combines all other functions.

The difference between `pipe` and `compose` is the order of execution of the
functions.

```js
import { pipe } from 'lazy-collections';

// Create a program (or a combination of functions)
const program = pipe(fn1, fn2, fn3);

program();
// fn3(fn2(fn1))
```

### `map`

Map a value from A to B.

```js
import { pipe, map } from 'lazy-collections';

const program = pipe(
  map(x => x * 2),
  Array.from
);

program([1, 2, 3]);
// [ 2, 4, 6 ]
```

### `filter`

Filter out values that do not meet the condition.

```js
import { pipe, filter } from 'lazy-collections';

const program = pipe(
  filter(x => x % 2 === 0),
  Array.from
);

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// [ 2, 4, 6, 8, 10 ]
```

### `reduce`

Reduce the data to a single value.

```js
import { pipe, reduce } from 'lazy-collections';

const program = pipe(reduce((total, current) => total + current, 0));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 55
```

### `concat`

Concat multiple iterators or arrays into a single iterator.

```js
import { pipe, concat } from 'lazy-collections';

const program = pipe(
  concat([0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]),
  Array.from
);

program();
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `chunk`

Chunk the data into pieces of a certain size

```js
import { pipe, chunk } from 'lazy-collections';

const program = pipe(chunk(3), Array.from);

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ];
```

### `flatten`

By default we will only flatten 1 level deep.

```js
import { pipe, flatten } from 'lazy-collections';

const program = pipe(flatten(), Array.from);

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

But you can also go deep

```js
import { pipe, flatten } from 'lazy-collections';

const program = pipe(flatten({ deep: true }), Array.from);

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `range`

Create a range of data using a lowerbound, upperbound and step. The step is
optional and defaults to `1`.

```js
import { pipe, range } from 'lazy-collections';

const program = pipe(range(5, 20, 5), Array.from);

program();
// [ 5, 10, 15, 20 ]
```

### `take`

Allows you to take X values of the input.

```js
import { pipe, take } from 'lazy-collections';

const program = pipe(take(3), Array.from);

program();
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

### `takeWhile`

This is similar to `take`, but instead of a number as a value it takes a
function as a condition.

```js
import { pipe, range, takeWhile } from 'lazy-collections';

const program = pipe(
  range(0, 10),
  takeWhile(x => x < 5),
  Array.from
);

program();
// [ 0, 1, 2, 3, 4 ]
```

### `slice`

Slice a certain portion from your data set. It accepts a start index and an end
index.

```js
import { pipe, range, slice } from 'lazy-collections';

const program = pipe(range(0, 10), slice(3, 5), Array.from);

program();
// [ 3, 4, 5 ]

// Without the slice this would have generated
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `unique`

Make your data unique.

```js
import { pipe, unique } from 'lazy-collections';

const program = pipe(unique(), Array.from);

program([1, 1, 2, 3, 2, 4, 5]);
// [ 1, 2, 3, 4, 5 ]
```

### `generate`

Generate accepts a function that function will be called over and over again.
Don't forget to combine this with a function that ensures that the data stream
will end. For example, you can use `take`, `takeWhile` or `slice`.

```js
import { pipe, generate, take } from 'lazy-collections';

const program = pipe(generate(Math.random), take(3), Array.from);

program();
// [ 0.7495421596380878, 0.09819118640607383, 0.2453718461872143 ]
```
