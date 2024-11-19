// multipleContainersMinimizeCost.test.ts
import { Bin, Parcel } from '@entities';
import { Size } from '@types';
import { expect, test } from 'vitest';

import { multipleContainersMinimizeCost } from './multipleContainersMinimizeCost.js';

const createMultipleParcels = (size: Size, qty: number): Parcel[] => {
  return Array.from({ length: qty }, () => new Parcel({ originalSize: size }));
};

test('mcmc can pack one parcel into a bin', () => {
  const bin = new Bin({
    size: {
      width: 20,
      height: 20,
      depth: 20,
    },
  });

  const parcels = [
    new Parcel({
      originalSize: {
        width: 10,
        height: 10,
        depth: 10,
      },
    }),
  ];

  const packedBins = multipleContainersMinimizeCost([bin], parcels);

  expect(packedBins[0].parcels.length).toBe(1);
  expect(packedBins[0].isValid()).toBe(true);
  expect(packedBins[0].fillRate()).toBe(1 / 8);
});

test('mcmc can pack multiple parcels into one layer', () => {
  const bin = new Bin({
    size: {
      width: 20,
      height: 20,
      depth: 20,
    },
  });

  const parcels = createMultipleParcels(
    { width: 10, height: 10, depth: 10 },
    4
  );

  const packedBins = multipleContainersMinimizeCost([bin], parcels);

  expect(packedBins[0].parcels.length).toBe(4);
  expect(packedBins[0].isValid()).toBe(true);
  expect(packedBins[0].fillRate()).toBe(0.5);
});

test('mcmc can pack multiple horizontal layers into one bin', () => {
  const bin = new Bin({
    size: {
      width: 20,
      height: 20,
      depth: 20,
    },
  });

  const parcels = createMultipleParcels(
    { width: 10, height: 10, depth: 10 },
    8
  );

  const packedBins = multipleContainersMinimizeCost([bin], parcels);

  expect(packedBins[0].parcels.length).toBe(8);
  expect(packedBins[0].isValid()).toBe(true);
});

test('mcmc can pack multiple horizontal layers into several bins', () => {
  const bin = new Bin({
    size: {
      width: 20,
      height: 20,
      depth: 20,
    },
  });

  const parcels = createMultipleParcels(
    { width: 10, height: 10, depth: 10 },
    12
  );

  const packedBins = multipleContainersMinimizeCost([bin], parcels);

  expect(packedBins[0].parcels.length).toBe(8);
  expect(packedBins[0].isValid()).toBe(true);

  expect(packedBins[1].parcels.length).toBe(4);
  expect(packedBins[1].isValid()).toBe(true);
});
