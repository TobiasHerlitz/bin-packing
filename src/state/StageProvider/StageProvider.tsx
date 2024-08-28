import { ReactNode, useReducer } from 'react';

import { StageContext } from './StageContext';
import { StageDispatchContext } from './StageDispatchContext';
import { stageInitialState } from './stageInitialState';
import { stageReducer } from './stageReducer';

interface StageProviderProps {
  children: ReactNode;
}

export const StageProvider = ({ children }: StageProviderProps) => {
  const [stageConfig, dispatch] = useReducer(stageReducer, stageInitialState);
  return (
    <StageContext.Provider value={stageConfig}>
      <StageDispatchContext.Provider value={dispatch}>
        {children}
      </StageDispatchContext.Provider>
    </StageContext.Provider>
  );
};
