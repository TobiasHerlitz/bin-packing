/** G4-heuristic Bin-packing (G4BP)
Essentially breaks it down to a 2D bin-packing problem by using layers where
boxes are equal height. The layers are then placed vertically (1D bin packing problem)
Dimensions can be assigned arbitrarily. w, h, d. Depth is parallell to the x axis
*/

import { Layer, Parcel, PlacedParcel, Rotation } from '@types';

// x: pivot.width,
// y: pivot.height,
// z: pivot.depth,

export const buildLayer = (layer: Layer, parcels: Parcel[], x = 0, z = 0) => {
  if (parcels.length === 0) {
    return layer;
  }

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < parcels.length; ++i) {
    if (placeParcel(layer, parcels[i], x, z)) {
      const remainingParcels = parcels.filter(
        (remainingParcel) => remainingParcel !== parcels[i]
      );

      buildLayer(layer, remainingParcels, x + parcels[i].size.width, z);
      buildLayer(layer, remainingParcels, x, z + parcels[i].size.depth);
      break;
    }
  }
  // parcels.every((parcel) => {
  //   if (placeParcel(layer, parcel, x, z)) {
  //     const remainingParcels = parcels.filter((remainingParcel) => remainingParcel !== parcel);

  //     buildLayer(layer, remainingParcels, x + parcel.size.width, z)
  //     buildLayer(layer, remainingParcels, x, z + parcel.size.depth)
  //     return false;
  //   }
  // })

  return layer;
};

const placeParcel = (layer: Layer, parcel: Parcel, x: number, z: number) => {
  const proposedParcel: PlacedParcel = {
    id: parcel.id,
    name: parcel.name,
    quantity: parcel.quantity,
    size: parcel.size,
    rotation: Rotation.DHW, // Fix
    rotatedSize: parcel.size,
    position: {
      x,
      y: 0,
      z,
    },
  };

  if (!canPlaceParcel(layer, proposedParcel, x, z)) {
    return false;
  }

  layer.parcels.push(proposedParcel);
  return true;
};

const canPlaceParcel = (
  layer: Layer,
  proposedParcel: PlacedParcel,
  x: number,
  z: number
) => {
  if (
    x + proposedParcel.size.width > layer.width ||
    z + proposedParcel.size.depth > layer.depth
  ) {
    return false;
  }

  return layer.parcels.every(
    (placedParcel) =>
      !(
        x + proposedParcel.size.width <= placedParcel.position.x ||
        x >= placedParcel.position.x + placedParcel.size.width
      ) ||
      z + proposedParcel.size.depth <= placedParcel.position.z ||
      z >= placedParcel.position.z + placedParcel.size.height
  );
};
