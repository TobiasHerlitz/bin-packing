import { Bin, Parcel } from '@entities';

import { buildLayer } from './buildLayer';

export const multipleContainersMinimizeCost = (
  bins: Bin[],
  parcels: Parcel[]
) => {
  // Linear Integer Programming (LIP):
  // Formulate problem using linear integer programming. Represent containers and how boxes are packed.

  // 1. Compute the total cost of all selected packing patterns
  // min(getTotalCost(something))
  // 2. Ensures that the selected packing patterns have sufficient space to pack the boxes of each type
  //
  // 3.

  // Column Generation Heuristic:
  // Generate possible loading column patterns that can packed together in a container. Evaluate packing configurations to minimize costs.

  // Selection of Optimal Patterns:
  // Chose patterns based on both packing efficiency and cost minimization while refining the solution.
  const layer = buildLayer(
    {
      width: bins[0].size.width,
      depth: bins[0].size.depth,
      parcels: [],
    },
    parcels
  );

  bins[0].parcels = layer.parcels;

  return bins[0];
};

/**
 * Gets total cost of a given solution (array of bins)
 */
export const getTotalCost = (bins: Bin[]) => {
  return bins.reduce((carry, bin) => carry + (bin.cost || 0), 0);
};

export const allParcelsPlaced = (bins: Bin[], parcels: Parcel[]) => {
  const allPlacedItems = bins.map(({ parcels }) => parcels).flat();

  const allItemsPlaced = parcels.every((parcel) =>
    allPlacedItems.some((placedItem) => placedItem.id === parcel.id)
  );

  if (!allItemsPlaced) {
    console.error('At least some parcels are not placed');
    return false;
  }

  return false;
};

// P -> packingPatterns - For single containers
// p -> packingPattern - For a single container
// c -> packingCost - Cost for a specific packing pattern
// i -> index for packingPatterns
// x -> packingPatternQuantity - Number of times packing pattern is used in a solution
// b -> box
// n -> number of boxes to be packed
// j -> index for box types
