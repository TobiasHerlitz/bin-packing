/** G4-heuristic Bin-packing (G4BP)
Essentially breaks it down to a 2D bin-packing problem by using layers where
boxes are equal height. The layers are then placed vertically (1D bin packing problem)
Dimensions can be assigned arbitrarily. w, h, d. Depth is parallell to the x axis
*/

import { Parcel } from '@entities';
import { Layer } from '@types';

// x: pivot.width,
// y: pivot.height,
// z: pivot.depth,

const g4Heuristic = (layer: Layer, parcels: Parcel[], x = 0, z = 0) => {
  if (parcels.length === 0) {
    return layer;
  }
  console.log(x, z);
  // for (let i = 0; i < parcels.length; ++i) {
  //   if (placeParcel(layer, parcels[i], x, z)) {
  //     const remainingParcels = parcels.filter(
  //       (remainingParcel) => remainingParcel !== parcels[i]
  //     );

  //     g4Heuristic(
  //       layer,
  //       remainingParcels,
  //       x + parcels[i].originalSize.width,
  //       z
  //     );
  //     g4Heuristic(
  //       layer,
  //       remainingParcels,
  //       x,
  //       z + parcels[i].originalSize.depth
  //     );
  //     break;
  //   }
  // }

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

export const buildLayer = (layer: Layer, parcels: Parcel[], x = 0, z = 0) => {
  return g4Heuristic(layer, parcels, x, z);
  // const layers: Layer[] = [];

  // // Try each box type for creating layers
  // for (const parcel of parcels) {
  //     // Try all orientations of the current box type
  //     for (const orientation of parcel.getOrientations()) {
  //         const layerHeight = orientation.height;

  //         // Check if the layer fits vertically in the container
  //         if (layerHeight <= container.height) {
  //             const numBoxesInLayer = g4Heuristic(container.length, container.width, orientation);

  //             if (numBoxesInLayer > 0) {
  //                 const newLayer = new Layer(layerHeight, numBoxesInLayer, box.type);

  //                 // Add boxes to the layer
  //                 for (let i = 0; i < numBoxesInLayer; i++) {
  //                     newLayer.addBox(orientation);
  //                 }

  //                 layers.push(newLayer);
  //             }
  //         }
  //     }
  // }

  // return layers;
};

// const placeParcel = (layer: Layer, parcel: Parcel, x: number, z: number) => {
//   const proposedParcel: PlacedParcel = {
//     id: parcel.id,
//     name: parcel.name,
//     quantity: parcel.quantity,
//     size: parcel.size,
//     rotation: Rotation.DHW, // Fix
//     rotatedSize: parcel.size,
//     position: {
//       x,
//       y: 0,
//       z,
//     },
//   };

//   if (!canPlaceParcel(layer, proposedParcel, x, z)) {
//     return false;
//   }

//   layer.parcels.push(proposedParcel);
//   return true;
// };

// const canPlaceParcel = (
//   layer: Layer,
//   proposedParcel: PlacedParcel,
//   x: number,
//   z: number
// ) => {
//   if (
//     x + proposedParcel.size.width > layer.width ||
//     z + proposedParcel.size.depth > layer.depth
//   ) {
//     return false;
//   }

//   return layer.parcels.every(
//     (placedParcel) =>
//       !(
//         x + proposedParcel.size.width <= placedParcel.position.x ||
//         x >= placedParcel.position.x + placedParcel.size.width
//       ) ||
//       z + proposedParcel.size.depth <= placedParcel.position.z ||
//       z >= placedParcel.position.z + placedParcel.size.height
//   );
// };
