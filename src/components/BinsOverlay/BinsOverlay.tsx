import { useGeometryDispatch, useGeometryState } from '@stateHooks';
import { Button, ButtonColor } from '@ui';
import { useState } from 'react';

import styles from './BinsOverlay.module.css';

export const BinsOverlay = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { bins, selectedBinId } = useGeometryState();
  const geometryDispatch = useGeometryDispatch();

  const packedBins = bins.filter((bin) => bin.parcels.length > 0);
  if (!packedBins.length) {
    return null;
  }

  return (
    <div className={styles.binsOverlay}>
      <div
        className={`${styles.header} ${isExpanded && styles.headerExpanded}`}
      >
        <h3>PACKED BINS</h3>
        <Button
          icon={isExpanded ? 'collapse_content' : 'expand_content'}
          colorScheme={ButtonColor.BGColor}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      {isExpanded && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>WIDTH</th>
              <th>HEIGHT</th>
              <th>DEPTH</th>
              <th>FILL</th>
              <th>SHOW</th>
            </tr>
          </thead>
          <tbody>
            {packedBins.map((bin) => (
              <tr key={bin.id}>
                <td>{bin.name}</td>
                <td>{bin.size.width}</td>
                <td>{bin.size.height}</td>
                <td>{bin.size.depth}</td>
                <td>{(bin.fillRate() * 100).toPrecision(3)}%</td>
                <td className={styles.showBin}>
                  <input
                    defaultChecked={selectedBinId === bin.id}
                    type="radio"
                    name="shownBin"
                    value={bin.id}
                    onChange={(e) =>
                      geometryDispatch({
                        type: 'setSelectedBinId',
                        binId: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
