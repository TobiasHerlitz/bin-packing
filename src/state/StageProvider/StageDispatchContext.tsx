import { CameraControls } from '@react-three/drei';
import { createContext, Dispatch, MutableRefObject } from 'react';

// Actions
interface ToggleGrid {
  type: 'toggleGrid';
}

interface TogglePerformance {
  type: 'togglePerformance';
}

interface ToggleScene {
  type: 'toggleScene';
}

interface SetCameraRef {
  type: 'setCameraRef';
  cameraRef?: MutableRefObject<CameraControls | null>;
}

export type StageActions =
  | ToggleGrid
  | TogglePerformance
  | ToggleScene
  | SetCameraRef;

export const StageDispatchContext =
  createContext<Dispatch<StageActions> | null>(null);
