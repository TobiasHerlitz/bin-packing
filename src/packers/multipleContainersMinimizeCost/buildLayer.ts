/**
Essentially breaks it down to a 2D bin-packing problem by using layers where
boxes are equal height. The layers are then placed vertically (1D bin packing problem)
Dimensions can be assigned arbitrarily. w, h, d. Depth is parallell to the x axis
*/

import { Bin, Parcel } from '@entities';
import { sortByDepth } from '@utils';

export const buildLayer = (layer: Bin, parcels: Parcel[]) => {
  return bestFitDescending(layer, parcels);
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

const bestFitDescending = (layer: Bin, parcels: Parcel[]) => {
  parcels.forEach((parcel) => {
    const { width, depth } = parcel.getRotatedSize();
    if (depth < width) {
      parcel.rotate90();
    }
  });
  const sortedParcels = sortByDepth(parcels);

  const shelves = placeIntoShelves(layer, sortedParcels);
  return combineShelves(layer, shelves);
};

const placeIntoShelves = (layer: Bin, parcels: Parcel[]) => {
  const shelves: Bin[] = [];
  parcels.forEach((parcel) => {
    shelves.some((shelf) => {
      return placeParcel(shelf, parcel);
    });
    if (parcel.isPositioned()) {
      return;
    }

    const { width, depth } = parcel.getRotatedSize();
    if (width > layer.size.width) {
      throw new Error(
        'Cannot create shelf that would hold next parcel without exceeding layer width'
      );
    }

    const newShelf = new Bin({
      size: {
        width: layer.size.width,
        height: layer.size.height,
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

const combineShelves = (layer: Bin, shelves: Bin[]) => {
  let pivotZ = 0;
  shelves.forEach((shelf) => {
    const shiftedParcels = shelf.parcels.map((parcel) => {
      const { x, y, z } = parcel.getPosition();
      parcel.setPosition({
        x,
        y,
        z: z + pivotZ,
      });
      return parcel;
    });
    layer.parcels.push(...shiftedParcels);
    pivotZ += shelf.size.depth;
  });
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
