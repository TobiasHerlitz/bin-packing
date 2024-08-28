import { Coordinate, Size } from '@types';

import { Bin, sortBins } from './bin';
import { getRotatedSize, Item, PlacedItem, Rotation, sortItems } from './item';

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

export function bestBin(bins: Bin[], items: Item[]) {
  const sortedBins = sortBins(bins);
  const sortedItems = sortItems(items);
  // Call pack_to_bin on each bin with all items. OG returns array of unfitted items, easier to return null
  sortedBins.forEach((bin) => {
    bin.items = [];
    sortedItems.every((item) => {
      const placedItem = packItem(bin, item);
      if (!placedItem) {
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

function putItem(bin: Bin, item: Item, pivot: Size): undefined | PlacedItem {
  let placedItem: undefined | PlacedItem = undefined;

  Object.values(Rotation).some((rotation) => {
    const proposedItem: PlacedItem = {
      name: item.name,
      sides: item.sides,
      weight: item.weight,
      size: getRotatedSize(item, rotation),
      position: {
        x: pivot.width,
        y: pivot.height,
        z: pivot.depth,
      },
    };

    const fits =
      bin.size.width > proposedItem.size.width + pivot.width &&
      bin.size.height > proposedItem.size.height + pivot.height &&
      bin.size.depth > proposedItem.size.depth + pivot.depth;

    if (!fits) return false;
    if (bin.items.some((binItem) => itemsIntersect(binItem, proposedItem))) {
      return false;
    }
    bin.items.push(proposedItem);
    placedItem = proposedItem;
    return true;
  });

  if (placedItem) {
    return placedItem;
  }

  return undefined;
}

function itemsIntersect(binItem: PlacedItem, proposedItem: PlacedItem) {
  return (
    rectIntersect(binItem, proposedItem, Axis.Width, Axis.Height) &&
    rectIntersect(binItem, proposedItem, Axis.Height, Axis.Depth) &&
    rectIntersect(binItem, proposedItem, Axis.Width, Axis.Depth)
  );
}

function rectIntersect(
  binItem: PlacedItem,
  proposedItem: PlacedItem,
  axisOne: Axis,
  axisTwo: Axis
) {
  const binItemSizeX = binItem.size[axisToSizeMap[axisOne]];
  const binItemSizeY = binItem.size[axisToSizeMap[axisTwo]];
  const proposedItemSizeX = proposedItem.size[axisToSizeMap[axisOne]];
  const proposedItemSizeY = proposedItem.size[axisToSizeMap[axisTwo]];

  const binItemCenter = {
    x: binItem.position[axisToCoordinateMap[axisOne]] + binItemSizeX / 2,
    y: binItem.position[axisToCoordinateMap[axisTwo]] + binItemSizeY / 2,
  };

  const proposedItemCenter = {
    x:
      proposedItem.position[axisToCoordinateMap[axisOne]] +
      proposedItemSizeX / 2,
    y:
      proposedItem.position[axisToCoordinateMap[axisTwo]] +
      proposedItemSizeY / 2,
  };

  const distanceX =
    Math.max(binItemCenter.x, proposedItemCenter.x) -
    Math.min(binItemCenter.x, proposedItemCenter.x);
  const distanceY =
    Math.max(binItemCenter.y, proposedItemCenter.y) -
    Math.min(binItemCenter.y, proposedItemCenter.y);

  // TODO: Handle rounding better
  return (
    distanceX < (binItemSizeX + proposedItemSizeX - 0.00001) / 2 &&
    distanceY < (binItemSizeY + proposedItemSizeY - 0.00001) / 2
  );
}

function packItem(bin: Bin, proposedItem: Item): undefined | PlacedItem {
  if (!bin.items.length) {
    return putItem(bin, proposedItem, START_POSITION);
  }

  let placedItem: undefined | PlacedItem = undefined;
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

      placedItem = putItem(bin, proposedItem, pivot) || undefined;
      if (placedItem) {
        return true;
      }
    });

    if (placedItem) {
      return true;
    }
  });

  return placedItem;
}
