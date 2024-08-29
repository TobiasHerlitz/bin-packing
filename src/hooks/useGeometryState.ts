import { GeometryContext } from '@state';
import { useContext } from 'react';

export function useGeometryState() {
  return useContext(GeometryContext);
}
