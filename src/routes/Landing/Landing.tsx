import { Controls, Scene } from '@components';
import { GeometryProvider, StageProvider } from '@state';

export const Landing = () => {
  return (
    <StageProvider>
      <GeometryProvider>
        <Scene />
        <Controls />
      </GeometryProvider>
    </StageProvider>
  );
};
