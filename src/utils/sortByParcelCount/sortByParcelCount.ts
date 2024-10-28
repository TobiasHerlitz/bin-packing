import { HeightGrouping } from '@types';

export const sortByParcelCount = (parcelGroups: HeightGrouping[]) => {
  return parcelGroups.toSorted((parcelGroupOne, parcelGroupTwo) => {
    if (parcelGroupOne.parcels.length > parcelGroupTwo.parcels.length) {
      return -1;
    }

    if (parcelGroupOne.parcels.length < parcelGroupTwo.parcels.length) {
      return 1;
    }

    return 0;
  });
};
