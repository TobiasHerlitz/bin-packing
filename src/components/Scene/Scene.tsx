import { Bin, SceneHelpers } from '@components';
import { CameraControls, RandomizedLight, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useSelectedBin, useStageDispatch, useStageState } from '@stateHooks';
import { Perf } from 'r3f-perf';
import { useEffect, useRef } from 'react';

import styles from './Scene.module.css';

export const Scene = () => {
  const cameraRef = useRef(null);
  const selectedBin = useSelectedBin();
  const { showScene, showPerformance } = useStageState();
  const stageDispatch = useStageDispatch();

  useEffect(() => {
    if (!cameraRef) return;

    stageDispatch({ type: 'setCameraRef', cameraRef });
  }, [cameraRef, stageDispatch]);

  if (!showScene) {
    return null;
  }
  return (
    <div className={styles.canvasWrapper}>
      <Canvas shadows camera={{ position: [2, 2, 2] }}>
        {showPerformance && <Perf position="bottom-left" />}
        <SceneHelpers />
        <RandomizedLight amount={8} frames={100} position={[5, 5, -10]} />
        <hemisphereLight intensity={1} />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        {selectedBin && <Bin bin={selectedBin} />}
        <CameraControls ref={cameraRef} makeDefault />
      </Canvas>
    </div>
  );
};
