import { Size } from '@types';

import { PlacedItem } from './item';

export interface Bin {
  name: string;
  size: Size;
  maxWeight: number;
  items: PlacedItem[];
}

export function sortBins(bins: Bin[]) {
  // TODO: sort small to large
  return bins;
}
