import { Bin, Parcel } from '@entities';
import { createContext } from 'react';

import { geometryInitialState } from './geometryInitialState';

// State
export interface GeometryState {
  parcels: Parcel[];
  bins: Bin[];
  selectedBinId?: string;
  selectedParcelId?: string;
}

export const GeometryContext =
  createContext<GeometryState>(geometryInitialState);
