// sum.test.js
import { v4 as UUIDv4 } from 'uuid';
import { expect, test } from 'vitest';

import { sortByVolume } from './sortByVolume.js';

test('sorting bins', () => {
  const sortedBins = sortByVolume([
    {
      id: UUIDv4(),
      name: 'BinOne',
      cost: 0,
      size: {
        width: 20,
        height: 20,
        depth: 20,
      },
      items: [],
    },
    {
      id: UUIDv4(),
      name: 'BinTwo',
      cost: 0,
      size: {
        width: 20,
        height: 10,
        depth: 20,
      },
      items: [],
    },
    {
      id: UUIDv4(),
      name: 'BinThree',
      cost: 0,
      size: {
        width: 400,
        height: 10,
        depth: 20,
      },
      items: [],
    },
    {
      id: UUIDv4(),
      name: 'BinFour',
      cost: 0,
      size: {
        width: 20,
        height: 10,
        depth: 20,
      },
      items: [],
    },
  ]);

  expect(sortedBins[0].name).toBe('BinThree');
  expect(sortedBins[1].name).toBe('BinOne');
  expect(sortedBins[2].name).toBe('BinTwo');
  expect(sortedBins[3].name).toBe('BinFour');
});
