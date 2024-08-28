import { GeometryDispatchContext } from '@state';
import { useContext } from 'react';

export function useGeometryDispatch() {
  const context = useContext(GeometryDispatchContext);
  if (!context) {
    throw Error('Context has not been Provided!');
  }

  return context;
}
