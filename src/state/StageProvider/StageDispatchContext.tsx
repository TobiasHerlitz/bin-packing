import { createContext, Dispatch } from 'react';

// Actions
interface ToggleGrid {
  type: 'toggleGrid';
}

interface SelectParcel {
  type: 'selectParcel';
  parcelName?: string;
}
export type StageActions = ToggleGrid | SelectParcel;

export const StageDispatchContext =
  createContext<Dispatch<StageActions> | null>(null);
