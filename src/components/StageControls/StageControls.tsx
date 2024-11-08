import { useStageDispatch, useStageState } from '@hooks';
import { Button, ButtonSize, Toggle } from '@ui';

import styles from './StageControls.module.css';

export const StageControls = () => {
  const stageState = useStageState();
  const stageDispatch = useStageDispatch();
  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <Toggle
          className={styles.toggle}
          id="toggleScene"
          checked={stageState.showScene}
          onChange={() => stageDispatch({ type: 'toggleScene' })}
        >
          Show scene
        </Toggle>
        {stageState.showScene && (
          <>
            <Toggle
              className={styles.toggle}
              id="toggleGrid"
              checked={stageState.showGrid}
              onChange={() => stageDispatch({ type: 'toggleGrid' })}
            >
              Show grid
            </Toggle>
            <Toggle
              className={styles.toggle}
              id="togglePerformance"
              checked={stageState.showPerformance}
              onChange={() => stageDispatch({ type: 'togglePerformance' })}
            >
              Show performance
            </Toggle>
            <div className={styles.buttonRow}>
              <span>Reset camera</span>
              <Button
                size={ButtonSize.Small}
                icon="restart_alt"
                onClick={() => stageState.cameraRef?.current?.reset()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
