import { Parcel } from '@entities';
import { HeightGrouping } from '@types';
import { partition } from 'lodash';

/**
 * 1. Rotates parcels and groups them into HeightGroupings by rotated height
 * 2. Sorts by descending parcel count
 */
export const createLayerGroupings = (parcels: Parcel[]): HeightGrouping[] => {
  const layerGroupings = groupByHeight(parcels);
  return sortByParcelCount(layerGroupings);
};

const groupByHeight = (parcels: Parcel[]): HeightGrouping[] => {
  if (!parcels.length) {
    return [];
  }

  const layerHeight = getMostCommonSideLength(parcels);

  const [rotatedParcels, remainingParcels] = partition(parcels, (parcel) => {
    parcel.rotateToLayerHeight(layerHeight);
    return parcel.isRotated();
  });

  return [
    { height: layerHeight, parcels: rotatedParcels },
    ...groupByHeight(remainingParcels),
  ];
};

const getMostCommonSideLength = (parcels: Parcel[]) => {
  const sideLengthFrequencies: Record<number, number> = {};

  parcels.forEach((parcel) => {
    const { width, height, depth } = parcel.originalSize;

    // Unique values to not double count parcels. (One parcel can only exist on one layer)
    const uniqueSideLengths = new Set([width, height, depth]);
    uniqueSideLengths.forEach((sideLength) => {
      sideLengthFrequencies[sideLength] =
        (sideLengthFrequencies[sideLength] || 0) + 1;
    });
  });

  const maxFrequency = Object.entries(sideLengthFrequencies).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max)
  );

  return Number(maxFrequency[0]);
};

const sortByParcelCount = (parcelGroups: HeightGrouping[]) => {
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
