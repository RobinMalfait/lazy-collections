<h3 align="center">
  Lazy Collections
</h3>

<p align="center">
  Fast and lazy collection operations.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lazy-collections"><img src="https://img.shields.io/npm/v/lazy-collections?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/lazy-collections"><img src="https://img.shields.io/npm/dm/lazy-collections?style=flat-square"></a>
  <a href="https://github.com/RobinMalfait/lazy-collections/actions"><img src="https://img.shields.io/github/workflow/status/RobinMalfait/lazy-collections/Node%20CI/master?style=flat-square"></a>
</p>

---

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

### Table of Contents

- [Benchmark](#benchmark)
- [API](#api)
  - [Composing functions](#composing-functions)
    - [`compose`](#compose)
    - [`pipe`](#pipe)
  - [Known array functions](#known-array-functions)
    - [`map`](#map)
    - [`filter`](#filter)
    - [`reduce`](#reduce)
    - [`find`](#find)
    - [`findIndex`](#findindex)
    - [`every`](#every)
    - [`some`](#some)
    - [`concat`](#concat)
    - [`reverse`](#reverse)
  - [Math / Statistics](#math--statistics)
    - [`sum`](#sum)
    - [`average`](#average)
    - [`max`](#max)
    - [`min`](#min)
  - [Utilities](#utilities)
    - [`head`](#head)
    - [`chunk`](#chunk)
    - [`zip`](#zip)
    - [`flatten`](#flatten)
    - [`range`](#range)
    - [`take`](#take)
    - [`takeWhile`](#takewhile)
    - [`skip`](#skip)
    - [`slice`](#slice)
    - [`unique`](#unique)
    - [`tap`](#tap)
    - [`groupBy`](#groupby)
    - [`where`](#where)
    - [`generate`](#generate)
    - [`toArray`](#toarray)

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

### Composing functions

#### `compose`

[Table of contents](#table-of-contents)

We can use compose to compose functions together and return a new function which
combines all other functions.

```js
import { compose } from 'lazy-collections';

// Create a program (or a combination of functions)
const program = compose(fn1, fn2, fn3);

program();
// fn1(fn2(fn3()))
```

#### `pipe`

[Table of contents](#table-of-contents)

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

### Known array functions

#### `map`

[Table of contents](#table-of-contents)

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

#### `filter`

[Table of contents](#table-of-contents)

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

#### `reduce`

[Table of contents](#table-of-contents)

Reduce the data to a single value.

```js
import { pipe, reduce } from 'lazy-collections';

const program = pipe(reduce((total, current) => total + current, 0));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 55
```

#### `find`

[Table of contents](#table-of-contents)

Find a value based on the given predicate.

```js
import { pipe, find } from 'lazy-collections';

const program = pipe(find(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 2
```

#### `findIndex`

[Table of contents](#table-of-contents)

Find an index based on the given predicate.

```js
import { pipe, findIndex } from 'lazy-collections';

const program = pipe(findIndex(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 2
```

#### `every`

[Table of contents](#table-of-contents)

Should return true if all values match the predicate.

```js
import { pipe, every } from 'lazy-collections';

const program = pipe(every(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// false
```

#### `some`

[Table of contents](#table-of-contents)

Should return true if some of the values match the predicate.

```js
import { pipe, some } from 'lazy-collections';

const program = pipe(some(x => x === 2));

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// true
```

#### `concat`

[Table of contents](#table-of-contents)

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

#### `reverse`

[Table of contents](#table-of-contents)

Reverses the iterator.

> **note**: This is currently very slow because it has to go through the full
> iterator first!

```js
import { pipe, reverse, toArray } from 'lazy-collections';

const program = pipe(range(0, 5), reverse(), toArray());

program();
// [ 5, 4, 3, 2, 1, 0 ]
```

### Math / Statistics

#### `sum`

[Table of contents](#table-of-contents)

Should sum an array or iterator.

```js
import { pipe, sum } from 'lazy-collections';

const program = pipe(sum());

program([1, 1, 2, 3, 2, 4, 5]);
// 18
```

#### `average`

[Table of contents](#table-of-contents)

> Alias: `mean`

Gets the average of number of values.

```js
import { pipe, average, toArray } from 'lazy-collections';

const program = pipe(average());

program([6, 7, 8, 9, 10]);
// 8
```

#### `max`

[Table of contents](#table-of-contents)

Find the maximum value of the given list

```js
import { pipe, range, max } from 'lazy-collections';

const program = pipe(range(0, 5), max());

program();
// 5
```

#### `min`

[Table of contents](#table-of-contents)

Find the minimum value of the given list

```js
import { pipe, range, min } from 'lazy-collections';

const program = pipe(range(5, 10), min());

program();
// 5
```

### Utilities

#### `head`

[Table of contents](#table-of-contents)

> Alias: `first`

Gets the first value of the array / iterator. Returns `undefined` if there is no
value.

```js
import { pipe, chunk, toArray } from 'lazy-collections';

const program = pipe(head());

program([6, 7, 8, 9, 10]);
// 6
```

#### `chunk`

[Table of contents](#table-of-contents)

Chunk the data into pieces of a certain size

```js
import { pipe, chunk, toArray } from 'lazy-collections';

const program = pipe(chunk(3), toArray());

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ];
```

#### `zip`

[Table of contents](#table-of-contents)

Zips multiple arrays / iterators together.

```js
import { pipe, zip, toArray } from 'lazy-collections';

const program = pipe(zip(), toArray());

program([
  [0, 1, 2],
  ['A', 'B', 'C'],
]);
// [ [ 0, 'A' ], [ 1, 'B' ], [ 2, 'C' ] ]
```

#### `flatten`

[Table of contents](#table-of-contents)

By default we will flatten recursively deep.

```js
import { pipe, flatten, toArray } from 'lazy-collections';

const program = pipe(flatten(), toArray());

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

But you can also just flatten shallowly

```js
import { pipe, flatten, toArray } from 'lazy-collections';

const program = pipe(flatten({ shallow: true }), toArray());

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]]);
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

#### `range`

[Table of contents](#table-of-contents)

Create a range of data using a lowerbound, upperbound and step. The step is
optional and defaults to `1`.

```js
import { pipe, range, toArray } from 'lazy-collections';

const program = pipe(range(5, 20, 5), toArray());

program();
// [ 5, 10, 15, 20 ]
```

#### `take`

[Table of contents](#table-of-contents)

Allows you to take X values of the input.

```js
import { pipe, range, take, toArray } from 'lazy-collections';

const program = pipe(range(0, 10), take(3), toArray());

program();
// [ 1, 2, 3 ]
```

#### `takeWhile`

[Table of contents](#table-of-contents)

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

#### `skip`

[Table of contents](#table-of-contents)

Allows you to skip X values of the input.

```js
import { pipe, range, skip, toArray } from 'lazy-collections';

const program = pipe(range(0, 10), skip(3), toArray());

program();
// [ 4, 5, 6, 7, 8, 9, 10 ]
```

#### `slice`

[Table of contents](#table-of-contents)

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

#### `unique`

[Table of contents](#table-of-contents)

Make your data unique.

```js
import { pipe, unique, toArray } from 'lazy-collections';

const program = pipe(unique(), toArray());

program([1, 1, 2, 3, 2, 4, 5]);
// [ 1, 2, 3, 4, 5 ]
```

#### `tap`

[Table of contents](#table-of-contents)

Allows you to tap into the stream, this way you can intercept each value.

```js
import { pipe, range, tap, toArray } from 'lazy-collections';

const program = pipe(
  range(0, 5),
  tap(x => {
    console.log('x:', x);
  }),
  toArray()
);

program();
// x: 0
// x: 1
// x: 2
// x: 3
// x: 4
// x: 5
// [ 0, 1, 2, 3, 4, 5 ]
```

#### `groupBy`

[Table of contents](#table-of-contents)

Groups the iterator to an object, using the keySelector function.

```js
import { pipe, groupBy, range } from 'lazy-collections';

// A function that will map the value to the nearest multitude. In this example
// we will map values to the nearest multitude of 5. So that we can group by
// this value.
function snap(multitude: number, value: number) {
  return Math.ceil(value / multitude) * multitude;
}

const program = pipe(
  range(0, 10),
  groupBy((x: number) => snap(5, x))
);

program();
// {
//   0: [0],
//   5: [1, 2, 3, 4, 5],
//   10: [6, 7, 8, 9, 10],
// }
```

#### `where`

[Table of contents](#table-of-contents)

Filter out values based on the given properties.

```js
import { pipe, where, range, map, where, toArray } from 'lazy-collections';

const program = pipe(
  range(15, 20),
  map(age => ({ age })),
  where({ age: 18 }),
  toArray()
);

program();
// [ { age: 18 } ]
```

#### `generate`

[Table of contents](#table-of-contents)

Generate accepts a function that function will be called over and over again.
Don't forget to combine this with a function that ensures that the data stream
will end. For example, you can use `take`, `takeWhile` or `slice`.

```js
import { pipe, generate, take, toArray } from 'lazy-collections';

const program = pipe(generate(Math.random), take(3), toArray());

program();
// [ 0.7495421596380878, 0.09819118640607383, 0.2453718461872143 ]
```

#### `toArray`

[Table of contents](#table-of-contents)

Converts an array or an iterator to an actual array.

```js
import { pipe, range, toArray } from 'lazy-collections';

const program = pipe(range(0, 10), toArray());

program();
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```
