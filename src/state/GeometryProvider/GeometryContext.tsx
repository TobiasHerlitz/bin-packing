import { Parcel, PlacedParcel } from '@types';
import { createContext } from 'react';

import { geometryInitialState } from './geometryInitialState';

// State
export interface GeometryState {
  parcels: (Parcel | PlacedParcel)[];
}

export const GeometryContext =
  createContext<GeometryState>(geometryInitialState);
