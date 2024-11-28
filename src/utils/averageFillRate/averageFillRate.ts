import { Bin } from '@entities';

export const averageFillRate = (bins: Bin[]) => {
  return bins.reduce((carry, bin) => carry + bin.fillRate(), 0) / bins.length;
};
