import { Parcel } from '@entities';

export interface Layer {
  width: number;
  depth: number;
  parcels: Parcel[];
}
