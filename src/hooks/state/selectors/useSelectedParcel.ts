import { useGeometryState } from '@stateHooks';
import { useMemo } from 'react';

export function useSelectedParcel() {
  const { selectedParcelId, solution } = useGeometryState();

  return useMemo(() => {
    if (!selectedParcelId || !solution) {
      return undefined;
    }

    for (const bin of solution) {
      const foundParcel = bin.parcels.find(({ id }) => id === selectedParcelId);
      if (foundParcel) {
        return foundParcel;
      }
    }
  }, [selectedParcelId, solution]);
}
