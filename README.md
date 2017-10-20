# Dataloader-results

High order functions for [dataloader](https://github.com/facebook/dataloader). It is useful to return compliant results (ordered and same length as ids array)

- Promise aware
- Only vanilla js and optimized

# Example

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
  optionalIndexer: r => a,
): (ids: a[]) => r[]
```

Accept a function (batchFetcher) that fetch synchronuously or asynchronuously data using ids array.

`orderedResults()` orders results returned by batchFetcher and if a result is missing, it returns null instead of nothing.

`optionalIndexer` is used to index result array returned by `batchFetcher`. Return value type must be the same as array of ids. Default indexer is defined to `r => r.id`;
