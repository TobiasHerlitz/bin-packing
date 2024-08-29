import { GeometryState } from './GeometryContext';

export const geometryInitialState: GeometryState = {
  parcels: [
    {
      name: 'ItemOne',
      sides: [0.4, 0.2, 0.5],
      weight: 20,
    },
    {
      name: 'ItemTwo',
      sides: [0.2, 0.4, 1],
      weight: 20,
    },
    {
      name: 'ItemThree',
      sides: [0.4, 0.2, 1],
      weight: 20,
    },
    {
      name: 'ItemFour',
      sides: [0.7, 0.2, 0.3],
      weight: 20,
    },
  ],
  bins: [
    {
      name: 'BinOne',
      size: {
        width: 1,
        height: 1,
        depth: 2,
      },
      maxWeight: 100,
      items: [],
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
