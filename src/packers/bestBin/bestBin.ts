import { Bin, Parcel } from '@entities';
import { Axis, Coordinate, Rotation } from '@types';
import { sortByVolume } from '@utils';

import { sortParcels } from './parcel';

const START_POSITION: Coordinate = {
  x: 0,
  y: 0,
  z: 0,
};

const AXIS_PRIORITY = [Axis.Depth, Axis.Width, Axis.Height];

export function bestBin(bins: Bin[], items: Parcel[]) {
  const sortedBins = sortByVolume(bins);
  const sortedParcels = sortParcels(items);
  // Call pack_to_bin on each bin with all items. OG returns array of unfitted items, easier to return null
  sortedBins.forEach((bin) => {
    bin.parcels = [];
    sortedParcels.every((item) => {
      const placedParcel = packParcel(bin, item);
      if (!placedParcel) {
        bin.parcels = [];
        return false;
      }
      return true;
    });
  });
  console.log(bins[0]);
  return bins[0];
  // Get best filling ratio of all bins
  // Select bin with highest filling ratio
}

function packParcel(bin: Bin, proposedParcel: Parcel): undefined | Parcel {
  if (!bin.parcels.length) {
    return putParcel(bin, proposedParcel, START_POSITION);
  }

  let placedParcel: undefined | Parcel = undefined;

  AXIS_PRIORITY.some((axis) => {
    bin.parcels.some((parcel) => {
      let pivot = { x: 0, y: 0, z: 0 };
      const { width, height, depth } = parcel.getRotatedSize();
      const { x, y, z } = parcel.getPosition();

      if (axis === Axis.Width) {
        pivot = { x: x + width, y, z };
      }

      if (axis === Axis.Height) {
        pivot = { x, y: y + height, z };
      }

      if (axis === Axis.Depth) {
        pivot = { x, y, z: z + depth };
      }

      placedParcel = putParcel(bin, proposedParcel, pivot) || undefined;
      if (placedParcel) {
        return true;
      }
    });

    if (placedParcel) {
      return true;
    }
  });

  return placedParcel;
}

function putParcel(
  bin: Bin,
  parcel: Parcel,
  pivot: Coordinate
): undefined | Parcel {
  Object.values(Rotation).some((rotation) => {
    parcel.setRotation(rotation);
    parcel.setPosition({
      x: pivot.x,
      y: pivot.y,
      z: pivot.z,
    });

    if (!bin.fits(parcel)) {
      parcel.unsetPose();
      return false;
    }

    const intersects = bin.parcels.some((binParcel) =>
      binParcel.intersects(parcel)
    );
    if (intersects) {
      parcel.unsetPose();
      return false;
    }
    bin.parcels.push(parcel);
    return true;
  });

  if (parcel.isPosed()) {
    return parcel;
  }

  return undefined;
}
