import { multipleContainersMinimizeCost } from '@packers';

import { GeometryState } from './GeometryContext';
import { GeometryActions } from './GeometryDispatchContext';

export function geometryReducer(
  state: GeometryState,
  action: GeometryActions
): GeometryState {
  switch (action.type) {
    case 'addParcel': {
      state.parcels.push(action.payload);
      return { ...state };
    }
    case 'setParcels': {
      return { ...state, parcels: action.payload };
    }
    case 'setBins': {
      return { ...state, bins: action.payload };
    }
    case 'setSolution': {
      return { ...state, solution: action.payload };
    }
    case 'pack': {
      const clonedParcels = state.parcels.map((parcel) => parcel.clone());
      state.bins.forEach((bin) => bin.reset());
      const bins = multipleContainersMinimizeCost(state.bins, clonedParcels);
      const selectedBinId = bins?.[0].id;
      return {
        ...state,
        solution: bins,
        selectedBinId,
        selectedParcelId: undefined,
      };
    }
    case 'setSelectedBinId': {
      const isChangingBin = state.selectedBinId !== action.binId;
      return {
        ...state,
        selectedBinId: action.binId,
        ...(isChangingBin && { selectedParcelId: undefined }),
      };
    }
    case 'setSelectedParcelId': {
      return { ...state, selectedParcelId: action.parcelId };
    }
    default: {
      throw Error('Unknown action in geometryReducer');
    }
  }
}
