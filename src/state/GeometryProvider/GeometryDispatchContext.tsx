import { Bin, Parcel } from '@entities';
import { createContext, Dispatch } from 'react';

interface AddParcel {
  type: 'addParcel';
  payload: Parcel;
}

interface SetParcels {
  type: 'setParcels';
  payload: Parcel[];
}

interface SetBins {
  type: 'setBins';
  payload: Bin[];
}

interface Pack {
  type: 'pack';
}

export type GeometryActions = AddParcel | SetParcels | SetBins | Pack;

export const GeometryDispatchContext =
  createContext<Dispatch<GeometryActions> | null>(null);
