import { CameraControls } from '@react-three/drei';
import { createContext, MutableRefObject } from 'react';

import { stageInitialState } from './stageInitialState';

// State
export interface StageState {
  showGrid: boolean;
  selectedParcel?: string;
  cameraRef?: MutableRefObject<CameraControls | null>;
}

export const StageContext = createContext<StageState>(stageInitialState);
