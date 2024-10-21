import { PlacedParcel } from './parcel';

export interface Layer {
  width: number;
  depth: number;
  parcels: PlacedParcel[];
}
