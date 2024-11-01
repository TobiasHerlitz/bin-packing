import { Bin, Parcel } from '@entities';

/**
 * Sorts by volume in descending order
 */
export const sortByVolume = <T extends Bin | Parcel>(items: T[]): T[] => {
  return items.toSorted((itemOne, itemTwo) => {
    if (itemOne.volume() > itemTwo.volume()) {
      return -1;
    }

    if (itemOne.volume() < itemTwo.volume()) {
      return 1;
    }

    return 0;
  });
};
