import { Bin, Coordinate, Parcel, PlacedParcel, Rotation, Size } from '@types';

import { sortBins } from './bin';
import { getRotatedSize, sortParcels } from './parcel';

enum Axis {
  Width = 'Width',
  Height = 'Height',
  Depth = 'Depth',
}

const START_POSITION: Size = {
  width: 0,
  height: 0,
  depth: 0,
};

const axisToCoordinateMap: Record<Axis, keyof Coordinate> = {
  [Axis.Width]: 'x',
  [Axis.Height]: 'y',
  [Axis.Depth]: 'z',
};

const axisToSizeMap: Record<Axis, keyof Size> = {
  [Axis.Width]: 'width',
  [Axis.Height]: 'height',
  [Axis.Depth]: 'depth',
};

export function bestBin(bins: Bin[], items: Parcel[]) {
  const sortedBins = sortBins(bins);
  const sortedParcels = sortParcels(items);
  // Call pack_to_bin on each bin with all items. OG returns array of unfitted items, easier to return null
  sortedBins.forEach((bin) => {
    bin.items = [];
    sortedParcels.every((item) => {
      const placedParcel = packParcel(bin, item);
      if (!placedParcel) {
        bin.items = [];
        return false;
      }
      return true;
    });
  });
  return bins[0];
  // Get best filling ratio of all bins
  // Select bin with highest filling ratio
}

function putParcel(
  bin: Bin,
  item: Parcel,
  pivot: Size
): undefined | PlacedParcel {
  let placedParcel: undefined | PlacedParcel = undefined;

  Object.values(Rotation).some((rotation) => {
    const proposedParcel: PlacedParcel = {
      name: item.name,
      size: item.size,
      rotation: rotation,
      rotatedSize: getRotatedSize(item, rotation),
      position: {
        x: pivot.width,
        y: pivot.height,
        z: pivot.depth,
      },
    };

    const fits =
      bin.size.width > proposedParcel.rotatedSize.width + pivot.width &&
      bin.size.height > proposedParcel.rotatedSize.height + pivot.height &&
      bin.size.depth > proposedParcel.rotatedSize.depth + pivot.depth;

    if (!fits) return false;
    if (
      bin.items.some((binParcel) => itemsIntersect(binParcel, proposedParcel))
    ) {
      return false;
    }
    bin.items.push(proposedParcel);
    placedParcel = proposedParcel;
    return true;
  });

  if (placedParcel) {
    return placedParcel;
  }

  return undefined;
}

function itemsIntersect(binParcel: PlacedParcel, proposedParcel: PlacedParcel) {
  return (
    rectIntersect(binParcel, proposedParcel, Axis.Width, Axis.Height) &&
    rectIntersect(binParcel, proposedParcel, Axis.Height, Axis.Depth) &&
    rectIntersect(binParcel, proposedParcel, Axis.Width, Axis.Depth)
  );
}

function rectIntersect(
  binParcel: PlacedParcel,
  proposedParcel: PlacedParcel,
  axisOne: Axis,
  axisTwo: Axis
) {
  const binParcelSizeX = binParcel.rotatedSize[axisToSizeMap[axisOne]];
  const binParcelSizeY = binParcel.rotatedSize[axisToSizeMap[axisTwo]];
  const proposedParcelSizeX =
    proposedParcel.rotatedSize[axisToSizeMap[axisOne]];
  const proposedParcelSizeY =
    proposedParcel.rotatedSize[axisToSizeMap[axisTwo]];

  const binParcelCenter = {
    x: binParcel.position[axisToCoordinateMap[axisOne]] + binParcelSizeX / 2,
    y: binParcel.position[axisToCoordinateMap[axisTwo]] + binParcelSizeY / 2,
  };

  const proposedParcelCenter = {
    x:
      proposedParcel.position[axisToCoordinateMap[axisOne]] +
      proposedParcelSizeX / 2,
    y:
      proposedParcel.position[axisToCoordinateMap[axisTwo]] +
      proposedParcelSizeY / 2,
  };

  const distanceX =
    Math.max(binParcelCenter.x, proposedParcelCenter.x) -
    Math.min(binParcelCenter.x, proposedParcelCenter.x);
  const distanceY =
    Math.max(binParcelCenter.y, proposedParcelCenter.y) -
    Math.min(binParcelCenter.y, proposedParcelCenter.y);

  // TODO: Handle rounding better
  return (
    distanceX < (binParcelSizeX + proposedParcelSizeX - 0.00001) / 2 &&
    distanceY < (binParcelSizeY + proposedParcelSizeY - 0.00001) / 2
  );
}

function packParcel(
  bin: Bin,
  proposedParcel: Parcel
): undefined | PlacedParcel {
  if (!bin.items.length) {
    return putParcel(bin, proposedParcel, START_POSITION);
  }

  let placedParcel: undefined | PlacedParcel = undefined;
  Object.values(Axis).some((axis) => {
    bin.items.some((item) => {
      let pivot = { width: 0, height: 0, depth: 0 };

      if (axis === Axis.Width) {
        pivot = {
          width: item.position.x + item.size.width,
          height: item.position.y,
          depth: item.position.z,
        };
      }

      if (axis === Axis.Height) {
        pivot = {
          width: item.position.x,
          height: item.position.y + item.size.height,
          depth: item.position.z,
        };
      }

      if (axis === Axis.Depth) {
        pivot = {
          width: item.position.x,
          height: item.position.y,
          depth: item.position.z + item.size.depth,
        };
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
