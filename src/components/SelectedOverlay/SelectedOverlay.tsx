import { useSelectedParcel } from '@stateHooks';

import styles from './SelectedOverlay.module.css';

export const SelectedOverlay = () => {
  const selectedParcel = useSelectedParcel();

  if (!selectedParcel) {
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
            <td>{selectedParcel.originalSize.width}</td>
            <td>{selectedParcel.originalSize.height}</td>
            <td>{selectedParcel.originalSize.depth}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
