import { useStageDispatch, useStageState } from '@hooks';
import { Toggle } from '@ui';

import styles from './StageControls.module.css';

export const StageControls = () => {
  const stageState = useStageState();
  const stageDispatch = useStageDispatch();
  return (
    <div className={styles.root}>
      <h2>Stage Controls</h2>
      <div className={styles.actions}>
        <span>
          <label htmlFor="toggleGrid">Show grid</label>
          <Toggle
            isEnabled={stageState.showGrid}
            onChange={() => stageDispatch({ type: 'toggleGrid' })}
          />
          <input
            type="checkbox"
            id="toggleGrid"
            name="toggleGrid"
            checked={stageState.showGrid}
            onChange={() => stageDispatch({ type: 'toggleGrid' })}
          />
        </span>
        <span>
          <button onClick={() => stageState.cameraRef?.current?.reset()}>
            Reset viewpoint
          </button>
        </span>
      </div>
    </div>
  );
};
