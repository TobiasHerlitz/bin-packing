import { StageDispatchContext } from '@state';
import { useContext } from 'react';

export function useStageDispatch() {
  const context = useContext(StageDispatchContext);
  if (!context) {
    throw Error('Context has not been Provided!');
  }

  return context;
}
