import { Size } from './geometry';
import { PlacedParcel } from './parcel';

export interface Bin {
  name: string;
  size: Size;
  items: PlacedParcel[];
}
