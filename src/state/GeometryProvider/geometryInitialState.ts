import { Rotation } from '@types';
import { v4 as UUIDv4 } from 'uuid';

import { GeometryState } from './GeometryContext';
const exampleParcels = [
  {
    id: UUIDv4(),
    name: 'ItemOne',
    quantity: 1,
    size: {
      width: 40,
      height: 40,
      depth: 50,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 40,
      height: 40,
      depth: 50,
    },
    position: {
      x: 20,
      y: 20,
      z: 0,
    },
  },
  {
    id: UUIDv4(),
    name: 'ItemTwo',
    quantity: 1,
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
    id: UUIDv4(),
    name: 'ItemThree',
    quantity: 1,
    size: {
      width: 40,
      height: 40,
      depth: 100,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 40,
      height: 40,
      depth: 100,
    },
    position: {
      x: 20,
      y: 0,
      z: 0,
    },
  },
  {
    id: UUIDv4(),
    name: 'ItemFour',
    quantity: 1,
    size: {
      width: 70,
      height: 40,
      depth: 30,
    },
    rotation: Rotation.WHD,
    rotatedSize: {
      width: 70,
      height: 40,
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
  parcels: exampleParcels.map(({ id, name, size, quantity }) => ({
    id,
    quantity,
    name,
    size,
  })),
  bins: [
    {
      id: UUIDv4(),
      name: 'BinOne',
      cost: 400,
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
