const { order, orderedResults } = require('../');

const expected = [
  { id: 1, data: 'foo' },
  { id: 2, data: 'bar' },
  { id: 3, data: 'baz' },
  { id: 4, data: 'hi' },
];

describe('dataloader-results', () => {
  it('same order', () => {
    const ids = [1, 2, 3, 4];

    expect(order(ids, expected)).toEqual(expected);
  });
  it('different order', () => {
    const ids = [1, 2, 3, 4];
    const actual = [
      { id: 3, data: 'baz' },
      { id: 2, data: 'bar' },
      { id: 4, data: 'hi' },
      { id: 1, data: 'foo' },
    ];

    expect(order(ids, actual)).toEqual(expected);
  });

  it('missing result order', () => {
    const ids = [1, 2, 3, 4];
    const actual = [
      { id: 2, data: 'bar' },
      { id: 4, data: 'hi' },
      { id: 1, data: 'foo' },
    ];

    expect(order(ids, actual)).toEqual([
      { id: 1, data: 'foo' },
      { id: 2, data: 'bar' },
      null,
      { id: 4, data: 'hi' },
    ]);
  });

  it('same ids', () => {
    const ids = [1, 1, 4, 2];
    const actual = [
      { id: 2, data: 'bar' },
      { id: 4, data: 'hi' },
      { id: 1, data: 'foo' },
    ];

    expect(order(ids, actual)).toEqual([
      { id: 1, data: 'foo' },
      { id: 1, data: 'foo' },
      { id: 4, data: 'hi' },
      { id: 2, data: 'bar' },
    ]);
  });

  it('specific resolver', () => {
    const ids = ['foo', 'bar', 'baz', 'hi'];
    expect(order(ids, expected, { indexer: r => r.data })).toEqual(expected);
  });

  it('specific idGetter', () => {
    const ids = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'hi' }];
    expect(order(ids, expected, {
      indexer: r => r.data,
      idGetter: id => id.id,
    })).toEqual(expected);
  });


  it('orderedResults with promise', () => {
    const fetcher = () => Promise.resolve(expected);
    const ids = [1, 2, 3, 4];

    return orderedResults(fetcher)(ids).then((r) => {
      expect(r).toEqual(expected);
    });
  });

  it('orderedResults sync', () => {
    const ids = [1, 2, 3, 4];
    const fetcher = () => expected;

    const r = orderedResults(fetcher)(ids);

    expect(r).toEqual(expected);
  });
});
