import { useGeometryState } from '@hooks';

import styles from './GeometryControls.module.css';

export const GeometryControls = () => {
  const geometryState = useGeometryState();

  return (
    <div className={styles.root}>
      <h2>Geometry Controls</h2>
      <div className={styles.parcels}>
        {geometryState.parcels.map(({ name }) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  );
};
