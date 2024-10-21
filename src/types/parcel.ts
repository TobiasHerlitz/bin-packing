import { Coordinate, Rotation, Size } from '@types';

export interface Parcel {
  id: string;
  name: string;
  size: Size;
}

export type PlacedParcel = Parcel & {
  rotation: Rotation;
  rotatedSize: Size;
  position: Coordinate;
};
