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
    case 'pack': {
      const clonedParcels = state.parcels.map((parcel) => parcel.clone());
      state.bins.forEach((bin) => bin.reset());
      const bin = multipleContainersMinimizeCost(state.bins, clonedParcels);
      return { ...state, bins: [bin] };
    }
    default: {
      throw Error('Unknown action in geometryReducer');
    }
  }
}
