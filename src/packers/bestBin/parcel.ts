import { Parcel, Rotation, Size } from '@types';

export function getRotatedSize(item: Parcel, rotation: Rotation): Size {
  switch (rotation) {
    case Rotation.WHD:
      return {
        width: item.size.width,
        height: item.size.height,
        depth: item.size.depth,
      };
    case Rotation.HWD:
      return {
        height: item.size.height,
        width: item.size.width,
        depth: item.size.depth,
      };
    case Rotation.HDW:
      return {
        height: item.size.height,
        depth: item.size.depth,
        width: item.size.width,
      };
    case Rotation.DHW:
      return {
        depth: item.size.depth,
        height: item.size.height,
        width: item.size.width,
      };
    case Rotation.DWH:
      return {
        depth: item.size.depth,
        width: item.size.width,
        height: item.size.height,
      };
    case Rotation.WDH:
      return {
        width: item.size.width,
        depth: item.size.depth,
        height: item.size.height,
      };
  }
}

export function sortParcels(parcels: Parcel[]) {
  return parcels.toSorted((itemOne: Parcel, itemTwo: Parcel) => {
    const itemOneVolume =
      itemOne.size.width * itemOne.size.height * itemOne.size.depth;
    const itemTwoVolume =
      itemTwo.size.width * itemTwo.size.height * itemTwo.size.depth;

    if (itemOneVolume > itemTwoVolume) {
      return -1;
    }

    if (itemOneVolume < itemTwoVolume) {
      return 1;
    }

    return 0;
  });
}
