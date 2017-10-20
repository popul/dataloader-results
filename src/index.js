/**
 * Order results using ids array
 * @param {number[]} ids array of identifiers
 * @param {Object[]} results array of result objects
 * @param {Function} [idResolver] called to get a result id
 */
const order = (ids, results, options) => {
  let { indexer, idGetter } = options || {};
  indexer = indexer || (r => r.id);
  idGetter = idGetter || (id => id);

  const indexedResults = {};
  for (let i = 0; i < results.length; i += 1) {
    const r = results[i];
    indexedResults[indexer(r)] = r;
  }

  const orderedResults = [];
  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i];
    orderedResults.push(indexedResults[idGetter(id)] || null);
  }

  return orderedResults;
};

const orderedResults = (batchFetcher, options) => (ids) => {
  const r = batchFetcher(ids);

  if (r.then) {
    return r.then(results => order(ids, results, options));
  }

  return order(ids, r, options);
};

exports.order = order;
exports.orderedResults = orderedResults;
