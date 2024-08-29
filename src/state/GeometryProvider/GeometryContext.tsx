import { Bin, Parcel, PlacedParcel } from '@types';
import { createContext } from 'react';

import { geometryInitialState } from './geometryInitialState';

// State
export interface GeometryState {
  parcels: (Parcel | PlacedParcel)[];
  bins: Bin[];
}

export const GeometryContext =
  createContext<GeometryState>(geometryInitialState);
