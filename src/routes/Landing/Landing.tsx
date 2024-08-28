import { Scene, SceneControls } from '@components';
import { StageProvider } from '@state';
import { useRef } from 'react';

export const Landing = () => {
  const cameraRef = useRef(null);

  return (
    <StageProvider>
      <Scene cameraRef={cameraRef} />
      <SceneControls cameraRef={cameraRef} />
    </StageProvider>
  );
};
