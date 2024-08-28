import { Coordinate, Size } from '@types';

export interface Parcel {
  name: string;
  sides: [number, number, number];
  weight: number;
}

export type PlacedParcel = Parcel & {
  // rotation: Rotation,
  position: Coordinate;
  size: Size;
};
