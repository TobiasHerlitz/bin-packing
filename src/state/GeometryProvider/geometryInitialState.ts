import { customSets } from '@problemSets';

import { GeometryState } from './GeometryContext';

export const geometryInitialState: GeometryState = {
  selectedBinId: undefined,
  selectedParcelId: undefined,
  parcels: customSets.custom1[0].parcels,
  bins: [customSets.custom1[0].bin],
  solution: [],
};
