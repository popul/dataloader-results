/**
 * Order results using ids array
 * @param {number[]} ids array of identifiers
 * @param {Object[]} results array of result objects
 * @param {Function} [idResolver] called to get a result id
 */
const order = (ids, results, optionalIndexer) => {
  const indexer = optionalIndexer || (r => r.id); // eslint-disable-line no-param-reassign

  const indexedResults = {};
  for (let i = 0; i < results.length; i += 1) {
    const r = results[i];
    indexedResults[indexer(r)] = r;
  }

  const orderedResults = [];
  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i];
    orderedResults.push(indexedResults[id] || null);
  }

  return orderedResults;
};

const orderedResults = (batchFetcher, optionalIndexer) => (ids) => {
  const r = batchFetcher(ids);

  if (r.then) {
    return r.then(results => order(ids, results, optionalIndexer));
  }

  return order(ids, r, optionalIndexer);
};

exports.order = order;
exports.orderedResults = orderedResults;
