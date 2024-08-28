import { createContext } from 'react';

import { stageInitialState } from './stageInitialState';

// State
export interface StageState {
  showGrid: boolean;
  selectedParcel?: string;
}

export const StageContext = createContext<StageState>(stageInitialState);
