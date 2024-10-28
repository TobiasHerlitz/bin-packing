import { Parcel } from '@entities';

export function sortParcels(parcels: Parcel[]) {
  return parcels.toSorted((itemOne: Parcel, itemTwo: Parcel) => {
    const itemOneVolume =
      itemOne.originalSize.width *
      itemOne.originalSize.height *
      itemOne.originalSize.depth;
    const itemTwoVolume =
      itemTwo.originalSize.width *
      itemTwo.originalSize.height *
      itemTwo.originalSize.depth;

    if (itemOneVolume > itemTwoVolume) {
      return -1;
    }

    if (itemOneVolume < itemTwoVolume) {
      return 1;
    }

    return 0;
  });
}
