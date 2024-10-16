import { useGeometryState, useStageState } from '@hooks';
import styles from './SelectedOverlay.module.css';

export const SelectedOverlay = () => {
  const stageState = useStageState();
  const geometryState = useGeometryState();

  if (!stageState.selectedParcel) {
    return null;
  }

  const selectedParcel = geometryState.bins[0].items.find((parcel) => parcel.name === stageState.selectedParcel)

  if (!selectedParcel) {
    console.error('Could not find selected parcel');
    return null;
  }

  return (
    <div className={styles.root}>
      <span>Name: {selectedParcel.name}</span>
      <span>Width: {selectedParcel.size.width}</span>
      <span>Height: {selectedParcel.size.height}</span>
      <span>Depth: {selectedParcel.size.depth}</span>
    </div>
  )
}
