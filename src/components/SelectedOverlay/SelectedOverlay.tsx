import { useGeometryState, useStageState } from '@hooks';

import styles from './SelectedOverlay.module.css';

export const SelectedOverlay = () => {
  const stageState = useStageState();
  const geometryState = useGeometryState();

  if (!stageState.selectedParcel) {
    return null;
  }

  const selectedParcel = geometryState.bins[0].items.find(
    (parcel) => parcel.name === stageState.selectedParcel
  );

  if (!selectedParcel) {
    console.error('Could not find selected parcel');
    return null;
  }

  return (
    <div className={styles.selectedOverlay}>
      <h3>Selected parcel</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>WIDTH</th>
            <th>HEIGHT</th>
            <th>DEPTH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedParcel.name}</td>
            <td>{selectedParcel.size.width}</td>
            <td>{selectedParcel.size.height}</td>
            <td>{selectedParcel.size.depth}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
