import { Bin, Parcel } from '@types';
import { createContext } from 'react';

import { geometryInitialState } from './geometryInitialState';

// State
export interface GeometryState {
  parcels: Parcel[];
  bins: Bin[];
}

export const GeometryContext =
  createContext<GeometryState>(geometryInitialState);
