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
    case 'togglePerformance': {
      return { ...state, showPerformance: !state.showPerformance };
    }
    case 'toggleScene': {
      return { ...state, showScene: !state.showScene };
    }
    case 'selectParcel': {
      return { ...state, selectedParcel: action.parcelName };
    }
    case 'setCameraRef': {
      return { ...state, cameraRef: action.cameraRef };
    }
    default: {
      throw Error('Unknown action in stageReducer');
    }
  }
}
