import { useGeometryState } from '@hooks';

import styles from './SolutionControls.module.css';

export const SolutionControls = () => {
  const { bins } = useGeometryState();

  if (bins.every(({ parcels }) => parcels.length === 0)) {
    return (
      <div className={styles.empty}>
        <p>
          No package solution found. 🤷
          <br />
          Open the packing tab and calculate one!
        </p>
      </div>
    );
  }

  const fakeBins = [...bins, ...bins, ...bins, ...bins];

  return (
    <div className={styles.solutionControls}>
      {fakeBins.map((bin) => (
        <div key={bin.id} className={styles.bin}>
          <h4 className={styles.binHeader}>{bin.name}</h4>
          <div className={styles.binData}>
            <div className={styles.packingMetrics}>
              <span>Fill rate</span>
              <span>{(bin.fillRate() * 100).toPrecision(3)}%</span>
            </div>
            <div className={styles.packingMetrics}>
              <span>Valid</span>
              <span>{bin.isValid() ? 'Yes' : 'No'}</span>
            </div>
            <div className={styles.packingMetrics}>
              <span>No of parcels</span>
              <span>{bin.parcels.length}</span>
            </div>
            <details>
              <summary>Parcels</summary>
              <div className={styles.parcels}>
                {bin.parcels.map((parcel) => (
                  <span key={parcel.id}>{parcel.name}</span>
                ))}
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
};
