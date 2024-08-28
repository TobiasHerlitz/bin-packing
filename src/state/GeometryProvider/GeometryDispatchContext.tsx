import { Parcel } from '@types';
import { createContext, Dispatch } from 'react';

interface AddParcel {
  type: 'addParcel';
  payload: Parcel;
}

export type GeometryActions = AddParcel;

export const GeometryDispatchContext =
  createContext<Dispatch<GeometryActions> | null>(null);
