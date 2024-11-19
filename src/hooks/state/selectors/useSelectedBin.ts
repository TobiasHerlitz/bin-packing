import { useGeometryState } from '@stateHooks';
import { useMemo } from 'react';

export function useSelectedBin() {
  const { selectedBinId, bins } = useGeometryState();

  return useMemo(() => {
    return bins.find(({ id }) => id === selectedBinId);
  }, [selectedBinId, bins]);
}
