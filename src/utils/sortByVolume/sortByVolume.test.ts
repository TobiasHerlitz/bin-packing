// sum.test.js
import { Bin } from '@entities';
import { expect, test } from 'vitest';

import { sortByVolume } from './sortByVolume.js';

test('sorting bins', () => {
  const sortedBins = sortByVolume([
    new Bin({
      name: 'BinOne',
      cost: 0,
      size: {
        width: 20,
        height: 20,
        depth: 20,
      },
      parcels: [],
    }),
    new Bin({
      name: 'BinTwo',
      cost: 0,
      size: {
        width: 20,
        height: 10,
        depth: 20,
      },
      parcels: [],
    }),
    new Bin({
      name: 'BinThree',
      cost: 0,
      size: {
        width: 400,
        height: 10,
        depth: 20,
      },
      parcels: [],
    }),
    new Bin({
      name: 'BinFour',
      cost: 0,
      size: {
        width: 20,
        height: 10,
        depth: 20,
      },
      parcels: [],
    }),
  ]);

  expect(sortedBins[0].name).toBe('BinThree');
  expect(sortedBins[1].name).toBe('BinOne');
  expect(sortedBins[2].name).toBe('BinTwo');
  expect(sortedBins[3].name).toBe('BinFour');
});
