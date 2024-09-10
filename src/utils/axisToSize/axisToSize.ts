import { Axis, Size } from '@types';

export const axisToSize: Record<Axis, keyof Size> = {
  [Axis.Width]: 'width',
  [Axis.Height]: 'height',
  [Axis.Depth]: 'depth',
};
