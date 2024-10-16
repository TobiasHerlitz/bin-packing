import { Coordinate, Rotation, Size } from '@types';
import { v4 as UUIDv4 } from 'uuid';

export interface Parcel {
  id: typeof UUIDv4;
  name: string;
  size: Size;
}

export type PlacedParcel = Parcel & {
  rotation: Rotation;
  rotatedSize: Size;
  position: Coordinate;
};
