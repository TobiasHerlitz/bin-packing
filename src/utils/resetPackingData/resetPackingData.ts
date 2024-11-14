import { Bin, Parcel } from '@entities';

export const resetPackingData = (bins: Bin[], parcels: Parcel[]) => {
  bins.forEach((bin) => bin.reset());
  parcels.forEach((parcel) => parcel.reset());
};
