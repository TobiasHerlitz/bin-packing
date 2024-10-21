import { bestBin } from '@packers';

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
      state.parcels = action.payload;
      return { ...state };
    }
    case 'pack': {
      console.log('PACKING');
      const bin = bestBin(state.bins, state.parcels);
      // const bin = multipleContainersMinimizeCost(state.bins, state.parcels);
      return { ...state, bins: [bin] };
    }
    default: {
      throw Error('Unknown action in geometryReducer');
    }
  }
}
