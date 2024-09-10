import { Axis, Coordinate } from '@types';

export const axisToCoordinate: Record<Axis, keyof Coordinate> = {
  [Axis.Width]: 'x',
  [Axis.Height]: 'y',
  [Axis.Depth]: 'z',
};
