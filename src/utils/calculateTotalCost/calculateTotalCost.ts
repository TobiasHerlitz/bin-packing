import { Bin } from '@entities';

/**
 * Sums total cost of a given solution (array of bins)
 */
export const calculateTotalCost = (bins: Bin[]) => {
  return bins.reduce((carry, bin) => carry + (bin.cost || 0), 0);
};
