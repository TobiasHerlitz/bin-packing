import { GeometryContext } from '@state';
import { useContext } from 'react';

export function useStageState() {
  return useContext(GeometryContext);
}
