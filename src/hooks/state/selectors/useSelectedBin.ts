import { useGeometryState } from '@stateHooks';
import { useMemo } from 'react';

export function useSelectedBin() {
  const { selectedBinId, solution } = useGeometryState();

  return useMemo(() => {
    return solution.find(({ id }) => id === selectedBinId);
  }, [selectedBinId, solution]);
}
