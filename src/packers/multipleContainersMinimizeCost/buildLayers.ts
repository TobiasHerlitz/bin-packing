/**
Essentially breaks it down to a 2D bin-packing problem by using layers where
boxes are equal height. The layers are then placed vertically (1D bin packing problem)
Dimensions can be assigned arbitrarily. w, h, d. Depth is parallell to the x axis
*/

import { Bin, Parcel } from '@entities';
import { sortByDepth } from '@utils';

const validateParcelHeight = (parcels: Parcel[]) => {
  const uniqueHeights = new Set(
    parcels.map((parcel) => parcel.getRotatedSize().height)
  );
  if (uniqueHeights.size > 1) {
    throw new Error('Rotated height must be the same on all parcels');
  }
};

export const buildLayers = (bin: Bin, parcels: Parcel[]) => {
  validateParcelHeight(parcels);
  return bestFitDescending(bin, parcels);
};

const placeParcel = (shelf: Bin, parcel: Parcel) => {
  console.log('placing', parcel.name);
  parcel.setPosition({
    x: shelf.usedWidth(),
    y: 0,
    z: 0,
  });

  if (shelf.canPlaceParcel(parcel)) {
    shelf.parcels.push(parcel);
    return true;
  }

  parcel.setPosition(undefined);
  return false;
};

const bestFitDescending = (bin: Bin, parcels: Parcel[]) => {
  parcels.forEach((parcel) => {
    const { width, depth } = parcel.getRotatedSize();
    if (depth < width) {
      parcel.rotate90();
    }
  });
  const sortedParcels = sortByDepth(parcels);

  const shelves = placeIntoShelves(bin, sortedParcels);
  return combineShelves(bin, shelves);
};

const placeIntoShelves = (bin: Bin, parcels: Parcel[]) => {
  const shelves: Bin[] = [];
  parcels.forEach((parcel) => {
    shelves.some((shelf) => {
      return placeParcel(shelf, parcel);
    });
    if (parcel.isPositioned()) {
      return;
    }

    const { width, depth, height } = parcel.getRotatedSize();
    if (width > bin.size.width) {
      throw new Error(
        'Cannot create shelf that would hold next parcel without exceeding layer width'
      );
    }

    const newShelf = new Bin({
      size: {
        width: bin.size.width,
        height,
        depth,
      },
    });

    const placementSuccessful = placeParcel(newShelf, parcel);
    if (!placementSuccessful) {
      throw new Error(
        'Something went wrong when placing into newly created shelf'
      );
    }

    shelves.push(newShelf);
  });
  return shelves;
};

const combineShelves = (bin: Bin, shelves: Bin[]) => {
  let pivotZ = 0;
  const layers = [
    new Bin({
      size: {
        width: bin.size.width,
        height: shelves[0].size.height,
        depth: bin.size.height,
      },
    }),
  ];

  shelves.forEach((shelf) => {
    if (pivotZ + shelf.size.depth > bin.size.depth) {
      layers.push(
        new Bin({
          size: {
            width: bin.size.width,
            height: shelves[0].size.height,
            depth: bin.size.height,
          },
        })
      );
      pivotZ = 0;
    }
    const shiftedParcels = shelf.parcels.map((parcel) => {
      const { x, y, z } = parcel.getPosition();
      parcel.setPosition({
        x,
        y,
        z: z + pivotZ,
      });
      return parcel;
    });
    // Push to last layer of layers
    layers[layers.length - 1].parcels.push(...shiftedParcels);
    pivotZ += shelf.size.depth;
  });

  return layers;
};

// FiniteBestStrip

// KPRG
// 1. Sort by min(width, depth)
// 2. Create rows with KP01. (Looks like BFDH)

// export const axisToCoordinate: Record<Axis, keyof Coordinate> = {
//   [Axis.Width]: 'x',
//   [Axis.Height]: 'y',
//   [Axis.Depth]: 'z',
// };
