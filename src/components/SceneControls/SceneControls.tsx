import { useStageDispatch, useStageState } from '@hooks';
import { CameraControls } from '@react-three/drei';
import { MutableRefObject } from 'react';

import styles from './SceneControls.module.css';

interface SceneControlsProps {
  cameraRef: MutableRefObject<CameraControls | null>;
}

export const SceneControls = ({ cameraRef }: SceneControlsProps) => {
  const sceneState = useStageState();
  const sceneDispatch = useStageDispatch();
  return (
    <div className={styles.root}>
      <h2>Scene Controls</h2>
      <div className={styles.actions}>
        <span>
          <label htmlFor="toggleGrid">Show grid</label>
          <input
            type="checkbox"
            id="toggleGrid"
            name="toggleGrid"
            checked={sceneState.showGrid}
            onChange={() => sceneDispatch({ type: 'toggleGrid' })}
          />
        </span>
        <span>
          <button onClick={() => cameraRef.current?.reset()}>
            Reset viewpoint
          </button>
        </span>
      </div>
    </div>
  );
};
