import { Bin, Parcel } from '@entities';

import { GeometryState } from './GeometryContext';
const exampleParcelsWith40Height = [
  new Parcel({
    name: 'Item one-40',
    originalSize: {
      width: 22,
      height: 40,
      depth: 63,
    },
  }),
  new Parcel({
    name: 'Item two-40',
    originalSize: {
      width: 24,
      height: 40,
      depth: 43,
    },
  }),
  new Parcel({
    name: 'Item three-40',
    originalSize: {
      width: 65,
      height: 40,
      depth: 78,
    },
  }),
  new Parcel({
    name: 'Item four-40',
    originalSize: {
      width: 72,
      height: 40,
      depth: 44,
    },
  }),
];

const exampleParcelsWith90sides = [
  new Parcel({
    name: 'Item one-90',
    originalSize: {
      width: 90,
      height: 53,
      depth: 37,
    },
  }),
  new Parcel({
    name: 'Item two-90',
    originalSize: {
      width: 96,
      height: 90,
      depth: 21,
    },
  }),
  new Parcel({
    name: 'Item three-90',
    originalSize: {
      width: 90,
      height: 40,
      depth: 85,
    },
  }),
  new Parcel({
    name: 'Item four-90',
    originalSize: {
      width: 90,
      height: 65,
      depth: 20,
    },
  }),
];

const exampleParcelsWithVariousSides = [
  new Parcel({
    name: 'Item one-var',
    originalSize: {
      width: 94,
      height: 23,
      depth: 32,
    },
  }),
  new Parcel({
    name: 'Item two-var',
    originalSize: {
      width: 44,
      height: 12,
      depth: 74,
    },
  }),
  new Parcel({
    name: 'Item three-var',
    originalSize: {
      width: 34,
      height: 47,
      depth: 83,
    },
  }),
  new Parcel({
    name: 'Item four-var',
    originalSize: {
      width: 87,
      height: 33,
      depth: 49,
    },
  }),
];

const exampleBins = [
  new Bin({
    name: 'Bin One',
    size: {
      width: 100,
      height: 100,
      depth: 200,
    },
  }),
];

export const geometryInitialState: GeometryState = {
  parcels: [
    ...exampleParcelsWith40Height,
    ...exampleParcelsWith90sides,
    ...exampleParcelsWithVariousSides,
  ],
  bins: exampleBins,
};
