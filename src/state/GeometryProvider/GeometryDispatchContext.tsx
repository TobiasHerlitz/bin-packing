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

interface SetSelectedBinId {
  type: 'setSelectedBinId';
  binId?: string;
}

interface SetSelectedParcelId {
  type: 'setSelectedParcelId';
  parcelId?: string;
}

export type GeometryActions =
  | AddParcel
  | SetParcels
  | SetBins
  | Pack
  | SetSelectedBinId
  | SetSelectedParcelId;

export const GeometryDispatchContext =
  createContext<Dispatch<GeometryActions> | null>(null);
