import { StageState } from './StageContext';
import { StageActions } from './StageDispatchContext';

export function stageReducer(
  state: StageState,
  action: StageActions
): StageState {
  switch (action.type) {
    case 'toggleGrid': {
      return { ...state, showGrid: !state.showGrid };
    }
    case 'selectParcel': {
      return { ...state, selectedParcel: action.parcelName };
    }
    default: {
      throw Error('Unknown action in stageReducer');
    }
  }
}
