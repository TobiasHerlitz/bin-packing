import { Parcel } from '@entities';

/**
 * Sorts by depth in descending order
 */
export const sortByDepth = (items: Parcel[]) => {
  return items.toSorted((itemOne, itemTwo) => {
    if (itemOne.getRotatedSize().depth > itemTwo.getRotatedSize().depth) {
      return -1;
    }

    if (itemOne.getRotatedSize().depth < itemTwo.getRotatedSize().depth) {
      return 1;
    }

    return 0;
  });
};
