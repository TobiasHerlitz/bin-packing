import { useGeometryState } from '@stateHooks';
import { useMemo } from 'react';

export function useSelectedParcel() {
  const { selectedParcelId, bins } = useGeometryState();

  return useMemo(() => {
    if (!selectedParcelId || !bins) {
      return undefined;
    }

    for (const bin of bins) {
      const foundParcel = bin.parcels.find(({ id }) => id === selectedParcelId);
      if (foundParcel) {
        return foundParcel;
      }
    }
  }, [selectedParcelId, bins]);
}
