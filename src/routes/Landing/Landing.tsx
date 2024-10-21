import { Controls, Scene, SelectedOverlay } from '@components';
import { GeometryProvider, StageProvider } from '@state';

export const Landing = () => {
  return (
    <StageProvider>
      <GeometryProvider>
        <Scene />
        <Controls />
        <SelectedOverlay />
      </GeometryProvider>
    </StageProvider>
  );
};
