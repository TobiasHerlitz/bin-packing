import { Size } from './geometry';
import { PlacedParcel } from './parcel';

export interface Bin {
  name: string;
  size: Size;
  maxWeight: number;
  items: PlacedParcel[];
}
