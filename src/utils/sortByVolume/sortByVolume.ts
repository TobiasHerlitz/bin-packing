import { Bin } from '@entities';

/**
 * Sorts by volume in descending order
 */
export const sortByVolume = (items: Bin[]) => {
  return items.toSorted((itemOne: Bin, itemTwo: Bin) => {
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
};
