import { Bin, Parcel } from '@entities';
import { createLayerGroupings } from '@utils';

import { buildLayers } from './buildLayers';

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

  const layerGroupings = createLayerGroupings(parcels);

  const layers: Bin[] = [];
  layerGroupings.forEach(({ parcels }) => {
    layers.push(...buildLayers(bins[0], parcels));
  });

  const packedBins = combineLayers(bins[0], layers);

  return packedBins;
};

const combineLayers = (binPrototype: Bin, layers: Bin[]) => {
  const packedBins: Bin[] = [];
  let pivotY = 0;

  layers.forEach((layer) => {
    // Todo. Can make this best fit, iterate over all bins
    if (
      !packedBins.length ||
      pivotY + layer.size.height > packedBins[packedBins.length - 1].size.height
    ) {
      pivotY = 0;
      packedBins.push(
        new Bin({
          size: {
            width: binPrototype.size.width,
            height: binPrototype.size.height,
            depth: binPrototype.size.depth,
          },
        })
      );
    }

    const shiftedParcels = layer.parcels.map((parcel) => {
      const { x, y, z } = parcel.getPosition();
      parcel.setPosition({
        x,
        y: y + pivotY,
        z,
      });
      return parcel;
    });

    packedBins[packedBins.length - 1].parcels.push(...shiftedParcels);
    pivotY += layer.size.height;
  });

  return packedBins;
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
