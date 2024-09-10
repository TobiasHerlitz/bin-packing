import { Rotation } from '@types';

import { GeometryState } from './GeometryContext';

const exampleParcels = [
  {
    name: 'ItemOne',
    size: {
      width: 40,
      height: 20,
      depth: 50,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 40,
      height: 20,
      depth: 50,
    },
    position: {
      x: 20,
      y: 20,
      z: 0,
    },
  },
  {
    name: 'ItemTwo',
    size: {
      width: 20,
      height: 40,
      depth: 100,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 20,
      height: 40,
      depth: 100,
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    name: 'ItemThree',
    size: {
      width: 40,
      height: 20,
      depth: 100,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 40,
      height: 20,
      depth: 100,
    },
    position: {
      x: 20,
      y: 0,
      z: 0,
    },
  },
  {
    name: 'ItemFour',
    size: {
      width: 70,
      height: 20,
      depth: 30,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 70,
      height: 20,
      depth: 30,
    },
    position: {
      x: 0,
      y: 40,
      z: 0,
    },
  },
];

export const geometryInitialState: GeometryState = {
  parcels: exampleParcels.map(({ name, size }) => ({
    name,
    size,
  })),
  bins: [
    {
      name: 'BinOne',
      size: {
        width: 100,
        height: 100,
        depth: 200,
      },
      items: exampleParcels,
    },
    // {
    //   name: 'BinTwo',
    //   size: {
    //     width: 200,
    //     height: 300,
    //     depth: 500
    //   },
    //   maxWeight: 150,
    //   items: []
    // }
  ],
};
