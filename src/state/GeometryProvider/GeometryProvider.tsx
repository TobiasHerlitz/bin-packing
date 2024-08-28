import { ReactNode, useReducer } from 'react';

import { GeometryContext } from './GeometryContext';
import { GeometryDispatchContext } from './GeometryDispatchContext';
import { geometryInitialState } from './geometryInitialState';
import { geometryReducer } from './geometryReducer';

interface GeometryProviderProps {
  children: ReactNode;
}

export const GeometryProvider = ({ children }: GeometryProviderProps) => {
  const [geometryConfig, dispatch] = useReducer(
    geometryReducer,
    geometryInitialState
  );
  return (
    <GeometryContext.Provider value={geometryConfig}>
      <GeometryDispatchContext.Provider value={dispatch}>
        {children}
      </GeometryDispatchContext.Provider>
    </GeometryContext.Provider>
  );
};
