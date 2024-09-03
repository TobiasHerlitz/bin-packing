import { Parcel } from '@types';
import { createContext, Dispatch } from 'react';

interface AddParcel {
  type: 'addParcel';
  payload: Parcel;
}

interface SetParcels {
  type: 'setParcels';
  payload: Parcel[];
}

interface Pack {
  type: 'pack';
}

export type GeometryActions = AddParcel | SetParcels | Pack;

export const GeometryDispatchContext =
  createContext<Dispatch<GeometryActions> | null>(null);
