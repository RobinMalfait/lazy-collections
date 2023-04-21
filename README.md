<h3 align="center">
  Lazy Collections
</h3>

<p align="center">
  Fast and lazy collection operations.
</p>

<p align="center">
  <a href="https://github.com/RobinMalfait/lazy-collections/actions"><img src="https://img.shields.io/github/actions/workflow/status/RobinMalfait/lazy-collections/ci.yml?branch=main&style=flat-square"></a>
  <a href="https://www.npmjs.com/package/lazy-collections"><img src="https://img.shields.io/npm/dt/lazy-collections?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/lazy-collections"><img src="https://img.shields.io/npm/dm/lazy-collections?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/lazy-collections"><img src="https://img.shields.io/npm/v/lazy-collections?style=flat-square"></a>
  <a href="https://github.com/RobinMalfait/lazy-collections/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/lazy-collections.svg?style=flat-square" alt="License"></a>
</p>

---

Working with methods like `.map()`, `.filter()` and `.reduce()` is nice,
however they create new arrays and everything is eagerly done before going to
the next step.

This is where lazy collections come in, under the hood we use [iterators][1] and
async iterators so that your data flows like a stream to have the optimal speed.

All functions should work with both `iterator` and `asyncIterator`, if one of
the functions uses an `asyncIterator` (for example when you introduce
`delay(100)`), don't forget to `await` the result!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol

```js
let program = pipe(
  map((x) => x * 2),
  filter((x) => x % 4 === 0),
  filter((x) => x % 100 === 0),
  filter((x) => x % 400 === 0),
  toArray()
)

program(range(0, 1000000))
```

### Table of Contents

- [Benchmark](#benchmark)
- [API](#api)
  - [Composing functions](#composing-functions)
    - [`compose`](#compose)
    - [`pipe`](#pipe)
  - [Known array functions](#known-array-functions)
    - [`at`](#at)
    - [`concat`](#concat)
    - [`every`](#every)
    - [`filter`](#filter)
    - [`find`](#find)
    - [`findIndex`](#findindex)
    - [`flatMap`](#flatMap)
    - [`includes`](#includes)
    - [`join`](#join)
    - [`map`](#map)
    - [`reduce`](#reduce)
    - [`replace`](#replace)
    - [`reverse`](#reverse)
    - [`some`](#some)
    - [`sort`](#sort)
  - [Math / Statistics](#math--statistics)
    - [`average`](#average)
    - [`max`](#max)
    - [`min`](#min)
    - [`sum`](#sum)
    - [`product`](#product)
  - [Utilities](#utilities)
    - [`batch`](#batch)
    - [`chunk`](#chunk)
    - [`compact`](#compact)
    - [`delay`](#delay)
    - [`flatten`](#flatten)
    - [`generate`](#generate)
    - [`groupBy`](#groupby)
    - [`head`](#head)
    - [`partition`](#partition)
    - [`range`](#range)
    - [`skip`](#skip)
    - [`slice`](#slice)
    - [`take`](#take)
    - [`takeWhile`](#takewhile)
    - [`tap`](#tap)
    - [`toArray`](#toarray)
    - [`toLength`](#tolength)
    - [`toSet`](#toset)
    - [`unique`](#unique)
    - [`wait`](#wait)
    - [`where`](#where)
    - [`windows`](#windows)
    - [`zip`](#zip)

## Benchmark

> :warning: This is not a scientific benchmark, there are flaws with this. This
> is just meant to showcase the power of lazy-collections.

|           &nbsp; |   Lazy    |    Eager    | &nbsp;            |
| ---------------: | :-------: | :---------: | ----------------- |
|         Duration | `2.19ms`  |   `1.29s`   | `589x` faster     |
| Memory heapTotal | `9.48 MB` | `297.96 MB` | `31x` less memory |
|  Memory heapUsed | `5.89 MB` | `265.46 MB` | `45x` less memory |

Memory data collected using: http://nodejs.org/api/process.html#process_process_memoryusage

```js
import { pipe, range, filter, takeWhile, slice, toArray } from 'lazy-collections'

// Lazy example
let program = pipe(
  range(0, 10_000_000),
  filter((x) => x % 100 === 0),
  filter((x) => x % 4 === 0),
  filter((x) => x % 400 === 0),
  takeWhile((x) => x < 1_000),
  slice(0, 1_000),
  toArray()
)

program() // [ 0, 400, 800 ]
```

```js
// Eager example
function program() {
  return (
    // Equivalent of the range()
    [...new Array(10_000_000).keys()]
      .filter((x) => x % 100 === 0)
      .filter((x) => x % 4 === 0)
      .filter((x) => x % 400 === 0)

      // Equivalent of the takeWhile
      .reduce((acc, current) => {
        return current < 1_000 ? (acc.push(current), acc) : acc
      }, [])
      .slice(0, 1_000)
  )
}

program() // [ 0, 400, 800 ]
```

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
import { compose } from 'lazy-collections'

// Create a program (or a combination of functions)
let program = compose(fn1, fn2, fn3)

program()
// fn1(fn2(fn3()))
```

#### `pipe`

[Table of contents](#table-of-contents)

We can use pipe to compose functions together and return a new function which
combines all other functions.

The difference between `pipe` and `compose` is the order of execution of the
functions.

```js
import { pipe } from 'lazy-collections'

// Create a program (or a combination of functions)
let program = pipe(fn1, fn2, fn3)

program()
// fn3(fn2(fn1()))
```

### Known array functions

#### `at`

[Table of contents](#table-of-contents)

Returns the value at the given index.

```js
import { pipe, at } from 'lazy-collections'

let program = pipe(at(2))

program([1, 2, 3, 4])

// 3
```

You can also pass a negative index to `at` to count back from the end of the array or iterator.

> **Warning**: Performance may be degraded because it has to exhaust the full iterator before it can count backwards!

```js
import { pipe, at } from 'lazy-collections'

let program = pipe(at(-2))

program([1, 2, 3, 4])

// 3
```

If a value can not be found at the given index, then `undefined` will be returned.

```js
import { pipe, at } from 'lazy-collections'

let program = pipe(at(12))

program([1, 2, 3, 4])

// undefined
```

#### `concat`

[Table of contents](#table-of-contents)

Concat multiple iterators or arrays into a single iterator.

```js
import { pipe, concat, toArray } from 'lazy-collections'

let program = pipe(concat([0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10]), toArray())

program()
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

#### `every`

[Table of contents](#table-of-contents)

Should return true if all values match the predicate.

```js
import { pipe, every } from 'lazy-collections'

let program = pipe(every((x) => x === 2))

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// false
```

#### `filter`

[Table of contents](#table-of-contents)

Filter out values that do not meet the condition.

```js
import { pipe, filter, toArray } from 'lazy-collections'

let program = pipe(
  filter((x) => x % 2 === 0),
  toArray()
)

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// [ 2, 4, 6, 8, 10 ]
```

#### `find`

[Table of contents](#table-of-contents)

Find a value based on the given predicate.

```js
import { pipe, find } from 'lazy-collections'

let program = pipe(find((x) => x === 2))

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// 2
```

#### `findIndex`

[Table of contents](#table-of-contents)

Find an index based on the given predicate.

```js
import { pipe, findIndex } from 'lazy-collections'

let program = pipe(findIndex((x) => x === 2))

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// 1
```

#### `flatMap`

[Table of contents](#table-of-contents)

Map a value from A to B and flattens it afterwards.

```js
import { pipe, flatMap, toArray } from 'lazy-collections'

let program = pipe(
  flatMap((x) => [x * 2, x * 4]),
  toArray()
)

program([1, 2, 3])
// [ 2, 4, 4, 8, 6, 12 ]
```

#### `includes`

[Table of contents](#table-of-contents)

Check if a value is included in an array or iterator.

```js
import { pipe, includes } from 'lazy-collections'

let program = pipe(includes(1))

program([1, 2, 3, 4])

// true
```

Each value is compared using `Object.is`. This will guarantee that edge cases with `NaN` also work the same as `Array.prototype.includes`.

Optionally, you can start searching from a positive index:

```js
import { pipe, includes } from 'lazy-collections'

let program = pipe(includes(1, 1))

program([1, 2, 3, 4])

// false
```

#### `join`

[Table of contents](#table-of-contents)

Join an array or iterator of strings.

```js
import { pipe, join } from 'lazy-collections'

let program = pipe(join())

program(['foo', 'bar', 'baz'])
// 'foo,bar,baz'
```

Optionally, you can join with a separator string:

```js
import { pipe, join } from 'lazy-collections'

let program = pipe(join(' '))

program(['foo', 'bar', 'baz'])
// 'foo bar baz'
```

#### `toLength`

[Table of contents](#table-of-contents)

> **Warning**: Performance warning, it has to exhaust the full iterator before it can calculate length!

Get the length of an array or iterator.

```js
import { pipe, toLength, filter } from 'lazy-collections'

let program = pipe(
  filter((x) => x % 2 === 0),
  toLength()
)

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// 5
```

#### `map`

[Table of contents](#table-of-contents)

Map a value from A to B.

```js
import { pipe, map, toArray } from 'lazy-collections'

let program = pipe(
  map((x) => x * 2),
  toArray()
)

program([1, 2, 3])
// [ 2, 4, 6 ]
```

#### `reduce`

[Table of contents](#table-of-contents)

Reduce the data to a single value.

```js
import { pipe, reduce } from 'lazy-collections'

let program = pipe(reduce((total, current) => total + current, 0))

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// 55
```

#### `replace`

[Table of contents](#table-of-contents)

Replace an item at a given index with a new value.

```js
import { pipe, replace } from 'lazy-collections'

let program = pipe(replace(2, 42))

program([1, 2, 3, 4])
// [ 1, 2, 42, 4 ]
```

#### `reverse`

> **Warning**: Performance may be degraded because it has to exhaust the full iterator before it can reverse it!

[Table of contents](#table-of-contents)

Reverses the iterator.

```js
import { pipe, reverse, toArray } from 'lazy-collections'

let program = pipe(range(0, 5), reverse(), toArray())

program()
// [ 5, 4, 3, 2, 1, 0 ]
```

#### `some`

[Table of contents](#table-of-contents)

Should return true if some of the values match the predicate.

```js
import { pipe, some } from 'lazy-collections'

let program = pipe(some((x) => x === 2))

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// true
```

#### `sort`

> **Warning**: Performance may be degraded because it has to exhaust the full iterator before it can sort it!

[Table of contents](#table-of-contents)

Should sort the data. You can also provide a comparator function to the `sort` function.

```js
import { pipe, generate, take, sort, toArray } from 'lazy-collections'

let program = pipe(
  generate(() => (Math.random() * 100) | 0),
  take(5),
  sort(),
  toArray()
)

program()
// [ 11, 18, 24, 27, 83 ]
```

### Math / Statistics

#### `average`

[Table of contents](#table-of-contents)

> Alias: `mean`

Gets the average of number of values.

```js
import { pipe, average, toArray } from 'lazy-collections'

let program = pipe(average())

program([6, 7, 8, 9, 10])
// 8
```

#### `max`

[Table of contents](#table-of-contents)

Find the maximum value of the given list

```js
import { pipe, range, max } from 'lazy-collections'

let program = pipe(range(0, 5), max())

program()
// 5
```

#### `min`

[Table of contents](#table-of-contents)

Find the minimum value of the given list

```js
import { pipe, range, min } from 'lazy-collections'

let program = pipe(range(5, 10), min())

program()
// 5
```

#### `sum`

[Table of contents](#table-of-contents)

Should sum an array or iterator.

```js
import { pipe, sum } from 'lazy-collections'

let program = pipe(sum())

program([1, 1, 2, 3, 2, 4, 5])
// 18
```

#### `product`

[Table of contents](#table-of-contents)

Should multiply an array or iterator.

```js
import { pipe, product } from 'lazy-collections'

let program = pipe(product())

program([1, 1, 2, 3, 2, 4, 5])
// 240
```

### Utilities

#### `batch`

[Table of contents](#table-of-contents)

This will call up to `N` amount of items in the stream immediately and wait for them in the correct
order. If you have a list of API calls, then you can use this method to start calling the API in
batches of `N` instead of waiting for each API call sequentially.

```js
import { pipe, range, map, batch, toArray } from 'lazy-collections'

let program = pipe(
  range(0, 9),
  map(() => fetch(`/users/${id}`)),
  batch(5), // Will create 2 "batches" of 5 API calls
  toArray()
)

await program()
// [ User1, User2, User3, User4, User5, User6, User7, User8, User9, User10 ];
```

#### `chunk`

[Table of contents](#table-of-contents)

Chunk the data into pieces of a certain size.

```js
import { pipe, chunk, toArray } from 'lazy-collections'

let program = pipe(chunk(3), toArray())

program([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ];
```

#### `compact`

[Table of contents](#table-of-contents)

Filters out all falsey values.

```js
import { pipe, compact, toArray } from 'lazy-collections'

let program = pipe(compact(), toArray())

program([0, 1, true, false, null, undefined, '', 'test', NaN])
// [ 1, true, 'test' ];
```

#### `delay`

[Table of contents](#table-of-contents)

Will make he whole program async. It will add a delay of x milliseconds when an
item goes through the stream.

```js
import { pipe, range, delay, map, toArray } from 'lazy-collections'

let program = pipe(
  range(0, 4),
  delay(5000), // 5 seconds
  map(() => new Date().toLocaleTimeString()),
  toArray()
)

await program()
// [ '10:00:00', '10:00:05', '10:00:10', '10:00:15', '10:00:20' ];
```

#### `flatten`

[Table of contents](#table-of-contents)

By default we will flatten recursively deep.

```js
import { pipe, flatten, toArray } from 'lazy-collections'

let program = pipe(flatten(), toArray())

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]])
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

But you can also just flatten shallowly

```js
import { pipe, flatten, toArray } from 'lazy-collections'

let program = pipe(flatten({ shallow: true }), toArray())

program([1, 2, 3, [4, 5, 6, [7, 8], 9, 10]])
// [ 1, 2, 3, 4, 5, 6, [ 7, 8 ], 9, 10 ]
```

#### `generate`

[Table of contents](#table-of-contents)

Generate accepts a function that function will be called over and over again.
Don't forget to combine this with a function that ensures that the data stream
will end. For example, you can use `take`, `takeWhile` or `slice`.

```js
import { pipe, generate, take, toArray } from 'lazy-collections'

let program = pipe(generate(Math.random), take(3), toArray())

program()
// [ 0.7495421596380878, 0.09819118640607383, 0.2453718461872143 ]
```

#### `groupBy`

[Table of contents](#table-of-contents)

Groups the iterator to an object, using the keySelector function.

```js
import { pipe, groupBy, range } from 'lazy-collections'

// A function that will map the value to the nearest multitude. In this example
// we will map values to the nearest multitude of 5. So that we can group by
// this value.
function snap(multitude: number, value: number) {
  return Math.ceil(value / multitude) * multitude
}

let program = pipe(
  range(0, 10),
  groupBy((x: number) => snap(5, x))
)

program()
// {
//   0: [0],
//   5: [1, 2, 3, 4, 5],
//   10: [6, 7, 8, 9, 10],
// }
```

#### `head`

[Table of contents](#table-of-contents)

> Alias: `first`

Gets the first value of the array / iterator. Returns `undefined` if there is no
value.

```js
import { pipe, chunk, toArray } from 'lazy-collections'

let program = pipe(head())

program([6, 7, 8, 9, 10])
// 6
```

#### `partition`

[Table of contents](#table-of-contents)

Partition data into 2 groups based on the predicate.

```js
import { pipe, partition, range, toArray } from 'lazy-collections'

let program = pipe(
  range(1, 4),
  partition((x) => x % 2 !== 0),
  toArray()
)

program()
// [ [ 1, 3 ], [ 2, 4 ] ]
```

#### `range`

[Table of contents](#table-of-contents)

Create a range of data using a lowerbound, upperbound and step. The step is
optional and defaults to `1`.

```js
import { pipe, range, toArray } from 'lazy-collections'

let program = pipe(range(5, 20, 5), toArray())

program()
// [ 5, 10, 15, 20 ]
```

#### `skip`

[Table of contents](#table-of-contents)

Allows you to skip X values of the input.

```js
import { pipe, range, skip, toArray } from 'lazy-collections'

let program = pipe(range(0, 10), skip(3), toArray())

program()
// [ 3, 4, 5, 6, 7, 8, 9, 10 ]
```

#### `slice`

[Table of contents](#table-of-contents)

Slice a certain portion from your data set. It accepts a start index and an end
index.

```js
import { pipe, range, slice, toArray } from 'lazy-collections'

let program = pipe(range(0, 10), slice(3, 5), toArray())

program()
// [ 3, 4, 5 ]

// Without the slice this would have generated
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

#### `take`

[Table of contents](#table-of-contents)

Allows you to take X values of the input.

```js
import { pipe, range, take, toArray } from 'lazy-collections'

let program = pipe(range(0, 10), take(3), toArray())

program()
// [ 0, 1, 2 ]
```

#### `takeWhile`

[Table of contents](#table-of-contents)

This is similar to `take`, but instead of a number as a value it takes a
function as a condition.

```js
import { pipe, range, takeWhile, toArray } from 'lazy-collections'

let program = pipe(
  range(0, 10),
  takeWhile((x) => x < 5),
  toArray()
)

program()
// [ 0, 1, 2, 3, 4 ]
```

#### `tap`

[Table of contents](#table-of-contents)

Allows you to tap into the stream, this way you can intercept each value.

```js
import { pipe, range, tap, toArray } from 'lazy-collections'

let program = pipe(
  range(0, 5),
  tap((x) => {
    console.log('x:', x)
  }),
  toArray()
)

program()
// x: 0
// x: 1
// x: 2
// x: 3
// x: 4
// x: 5
// [ 0, 1, 2, 3, 4, 5 ]
```

#### `toArray`

[Table of contents](#table-of-contents)

Converts an array or an iterator to an actual array.

```js
import { pipe, range, toArray } from 'lazy-collections'

let program = pipe(range(0, 10), toArray())

program()
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

#### `toSet`

[Table of contents](#table-of-contents)

Converts an array or an iterator to Set.

```js
import { pipe, range, toSet } from 'lazy-collections'

let program = pipe(range(0, 10), toSet())

program()
// Set (11) { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
```

#### `unique`

[Table of contents](#table-of-contents)

Make your data unique.

```js
import { pipe, unique, toArray } from 'lazy-collections'

let program = pipe(unique(), toArray())

program([1, 1, 2, 3, 2, 4, 5])
// [ 1, 2, 3, 4, 5 ]
```

#### `wait`

[Table of contents](#table-of-contents)

Will make he whole program async. It is similar to delay, but there is no actual delay involved. If
your stream contains promises it will resolve those promises instead of possibly resolving to an
array of pending promises.

> **Note**: This will execute the fetch calls sequentially, it will go to the next call once the
> first call is done. To prevent this you can use the [`batch`](#batch) function to help with this.

```js
import { pipe, range, map, wait, toArray } from 'lazy-collections'

let program = pipe(
  range(0, 4),
  map((id) => fetch(`/my-api/users/${id}`)),
  wait(),
  toArray()
)

await program()
// [ User1, User2, User3, User4, User5 ];
```

#### `where`

[Table of contents](#table-of-contents)

Filter out values based on the given properties.

```js
import { pipe, where, range, map, where, toArray } from 'lazy-collections'

let program = pipe(
  range(15, 20),
  map((age) => ({ age })),
  where({ age: 18 }),
  toArray()
)

program()
// [ { age: 18 } ]
```

#### `windows`

[Table of contents](#table-of-contents)

Get a sliding window of a certain size, for the given input.

```js
import { pipe, windows, toArray } from 'lazy-collections'

let program = pipe(windows(2), toArray())

program(['l', 'a', 'z', 'y'])
// [ [ 'l', 'a' ], [ 'a', 'z' ], [ 'z', 'y' ] ]
```

#### `zip`

[Table of contents](#table-of-contents)

Zips multiple arrays / iterators together.

```js
import { pipe, zip, toArray } from 'lazy-collections'

let program = pipe(zip(), toArray())

program([
  [0, 1, 2],
  ['A', 'B', 'C'],
])
// [ [ 0, 'A' ], [ 1, 'B' ], [ 2, 'C' ] ]
```
