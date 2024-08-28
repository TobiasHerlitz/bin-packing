import { StageContext } from '@state';
import { useContext } from 'react';

export function useStageState() {
  return useContext(StageContext);
}
