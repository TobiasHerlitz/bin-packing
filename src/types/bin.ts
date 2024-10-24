import { Size } from './geometry';
import { PlacedParcel } from './parcel';

export interface Bin {
  id: string;
  name: string;
  size: Size;
  items: PlacedParcel[];
  cost: number;
}
