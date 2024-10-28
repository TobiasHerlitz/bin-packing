import { Bin, Parcel } from '@entities';

import { GeometryState } from './GeometryContext';
const exampleParcels = [
  new Parcel({
    name: 'Item one',
    originalSize: {
      width: 40,
      height: 40,
      depth: 60,
    },
  }),
  new Parcel({
    name: 'Item two',
    originalSize: {
      width: 20,
      height: 40,
      depth: 60,
    },
  }),
  new Parcel({
    name: 'Item three',
    originalSize: {
      width: 40,
      height: 40,
      depth: 60,
    },
  }),
  new Parcel({
    name: 'Item four',
    originalSize: {
      width: 40,
      height: 40,
      depth: 60,
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
  parcels: exampleParcels,
  bins: exampleBins,
};
