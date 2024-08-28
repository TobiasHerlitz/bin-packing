import { GeometryState } from './GeometryContext';
import { GeometryActions } from './GeometryDispatchContext';

export function geometryReducer(
  state: GeometryState,
  action: GeometryActions
): GeometryState {
  switch (action.type) {
    case 'addParcel': {
      state.parcels.push(action.payload);
      return state;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
