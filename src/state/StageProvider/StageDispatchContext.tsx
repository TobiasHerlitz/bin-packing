import { CameraControls } from '@react-three/drei';
import { createContext, Dispatch, MutableRefObject } from 'react';

// Actions
interface ToggleGrid {
  type: 'toggleGrid';
}

interface SelectParcel {
  type: 'selectParcel';
  parcelName?: string;
}

interface SetCameraRef {
  type: 'setCameraRef';
  cameraRef?: MutableRefObject<CameraControls | null>;
}

export type StageActions = ToggleGrid | SelectParcel | SetCameraRef;

export const StageDispatchContext =
  createContext<Dispatch<StageActions> | null>(null);
