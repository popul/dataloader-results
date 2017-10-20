# dataloader-results

High order functions for [dataloader](https://github.com/facebook/dataloader). It is useful to return compliant results (ordered and same length as ids array)

- Promise aware
- Only vanilla js and optimized

## Install

```sh
npm i -S dataloader-results
```

## Example

```js

const { orderedResults } = require('dataloader-results');

...

const getObjectsByIds = (ids) => ...
const dataLoader = new DataLoader(orderedResults(getObjectsByIds));

Promise.all([
  dataLoader.load(1),
  dataLoader.load(2),
  dataLoader.load(3),
  dataLoader.load(4),
]).then((r) => {
  ...
})

```

## API

### orderedResults()

```js
orderedResults(
  batchFetcher: (ids: a[]) => r[],
  options?: {
    indexer: r => a,
    idGetter: a => b,
  }
): (ids: a[]) => r[]
```

Accept a function (batchFetcher) that fetch synchronuously or asynchronuously data using ids array.

It returns an array of results with same length as ids array (a[]).

`orderedResults()` orders results returned by batchFetcher and if a result is missing, it returns null instead of nothing.

`options` is optional. It can used to define custom indexer and custom idGetter

`options.indexer` is used to index result array returned by `batchFetcher`. Return value type must be the same as array of ids. Default indexer is defined to `r => r.id`;

`options.idGetter` is used to transform index when creating result array. Default idGetter is
defined to `id => id`. This parameter is useful when `a` is an object and not an `number` or `string`