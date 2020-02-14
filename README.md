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
  toArray()
);

program(range(0, 1000000));
```

## Benchmark

> :warning: This is not a scientific benchmark, there are flaws with this. This
> is just meant to showcase the power of lazy-collections.

```js
// Lazy example
const program = pipe(
  range(0, 10_000_000),
  filter(x => x % 100 === 0),
  filter(x => x % 4 === 0),
  filter(x => x % 400 === 0),
  takeWhile(x => x < 1_000),
  slice(0, 1_000),
  toArray()
);

program(); // [ 0, 400, 800 ]
```

> Duration: `2.19ms`

Memory usage:

| Key       | Value    |
| --------- | -------- |
| rss       | 34.55 MB |
| heapTotal | 9.48 MB  |
| heapUsed  | 5.89 MB  |
| external  | 0.94 MB  |

```js
// Eager example
function program() {
  return (
    // Equivalent of the range()
    [...new Array(10_000_000).keys()]
      .filter(x => x % 100 === 0)
      .filter(x => x % 4 === 0)
      .filter(x => x % 400 === 0)

      // Equivalent of the takeWhile
      .reduce((acc, current) => {
        return current < 1_000 ? (acc.push(current), acc) : acc;
      }, [])
      .slice(0, 1_000)
  );
}

program(); // [ 0, 400, 800 ]
```

> Duration: `1.29s` (Notice that this one is expressed in seconds)

Memory usage:

| Key       | Value     |
| --------- | --------- |
| rss       | 318.3 MB  |
| heapTotal | 297.96 MB |
| heapUsed  | 265.46 MB |
| external  | 0.84 MB   |

---

This is actually a stupid non-real-world example. However, it is way more
efficient at doing things. That said, _yes_ you can optimize the eager example
way more if you want to. You can combine the `filter` / `reduce` / `...`. However,
what I want to achieve is that we can have separated logic in different `filter`
or `map` steps _without_ thinking about performance bottlenecks.

## API

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
// fn3(fn2(fn1()))
```

### `map`

Map a value from A to B.

```js
import { pipe, map, toArray } from 'lazy-collections';

const program = pipe(
  map(x => x * 2),
  toArray()
);

program([1, 2, 3]);
// [ 2, 4, 6 ]
```

### `filter`

Filter out values that do not meet the condition.

```js
import { pipe, filter, toArray } from 'lazy-collections';

const program = pipe(
  filter(x => x % 2 === 0),
  toArray()
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

### `find`

Find a value based on the given predicate.

```js
import { pipe, find } from 'lazy-collections';

const program = pipe(find(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 2
```

### `findIndex`

Find an index based on the given predicate.

```js
import { pipe, findIndex } from 'lazy-collections';

const program = pipe(findIndex(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 2
```

### `every`

Should return true if all values match the predicate.

```js
import { pipe, every } from 'lazy-collections';

const program = pipe(every(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// false
```

### `some`

Should return true if some of the values match the predicate.

```js
import { pipe, some } from 'lazy-collections';

const program = pipe(some(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// true
```

### `concat`

Concat multiple iterators or arrays into a single iterator.

```js
import { pipe, concat, toArray } from 'lazy-collections';

const program = pipe(
  concat([0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]),
  toArray()
);

program();
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `chunk`

Chunk the data into pieces of a certain size

```js
import { pipe, chunk, toArray } from 'lazy-collections';

const program = pipe(chunk(3), toArray());

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ];
```

### `flatten`

By default we will only flatten 1 level deep.

```js
import { pipe, flatten, toArray } from 'lazy-collections';

const program = pipe(flatten(), toArray());

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

But you can also go deep

```js
import { pipe, flatten, toArray } from 'lazy-collections';

const program = pipe(flatten({ deep: true }), toArray());

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `range`

Create a range of data using a lowerbound, upperbound and step. The step is
optional and defaults to `1`.

```js
import { pipe, range, toArray } from 'lazy-collections';

const program = pipe(range(5, 20, 5), toArray());

program();
// [ 5, 10, 15, 20 ]
```

### `take`

Allows you to take X values of the input.

```js
import { pipe, take, toArray } from 'lazy-collections';

const program = pipe(take(3), toArray());

program();
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

### `takeWhile`

This is similar to `take`, but instead of a number as a value it takes a
function as a condition.

```js
import { pipe, range, takeWhile, toArray } from 'lazy-collections';

const program = pipe(
  range(0, 10),
  takeWhile(x => x < 5),
  toArray()
);

program();
// [ 0, 1, 2, 3, 4 ]
```

### `slice`

Slice a certain portion from your data set. It accepts a start index and an end
index.

```js
import { pipe, range, slice, toArray } from 'lazy-collections';

const program = pipe(range(0, 10), slice(3, 5), toArray());

program();
// [ 3, 4, 5 ]

// Without the slice this would have generated
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

### `unique`

Make your data unique.

```js
import { pipe, unique, toArray } from 'lazy-collections';

const program = pipe(unique(), toArray());

program([1, 1, 2, 3, 2, 4, 5]);
// [ 1, 2, 3, 4, 5 ]
```

### `sum`

Should sum an array or iterator.

```js
import { pipe, sum } from 'lazy-collections';

const program = pipe(sum());

program([1, 1, 2, 3, 2, 4, 5]);
// 18
```

### `generate`

Generate accepts a function that function will be called over and over again.
Don't forget to combine this with a function that ensures that the data stream
will end. For example, you can use `take`, `takeWhile` or `slice`.

```js
import { pipe, generate, take, toArray } from 'lazy-collections';

const program = pipe(generate(Math.random), take(3), toArray());

program();
// [ 0.7495421596380878, 0.09819118640607383, 0.2453718461872143 ]
```

### `toArray`

Converts an array or an iterator to an actual array.

```js
import { pipe, range, toArray } from 'lazy-collections';

const program = pipe(range(0, 10), toArray());

program();
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```
