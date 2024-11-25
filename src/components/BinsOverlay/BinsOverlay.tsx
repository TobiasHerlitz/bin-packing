import { Bin } from '@entities';
import { useGeometryDispatch, useGeometryState } from '@stateHooks';
import { ColumnDef } from '@tanstack/react-table';
import { Button, ButtonColor, InputTable } from '@ui';
import { useMemo, useState } from 'react';

import styles from './BinsOverlay.module.css';

export const BinsOverlay = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { bins, selectedBinId } = useGeometryState();
  const geometryDispatch = useGeometryDispatch();

  const packedBins = bins.filter((bin) => bin.parcels.length > 0);

  const columns: ColumnDef<Bin>[] = useMemo(
    () => [
      {
        id: 'expand',
        size: 40,
        cell: () => (
          <Button icon="unfold_more" colorScheme={ButtonColor.BGColor} />
        ),
      },
      {
        id: 'name',
        header: 'NAME',
        size: 260,
        cell: ({ row: { original } }) => original.name,
      },
      {
        header: 'WIDTH',
        size: 80,
        cell: ({ row: { original } }) => original.size.width,
      },
      {
        header: 'HEIGHT',
        size: 80,
        cell: ({ row: { original } }) => original.size.height,
      },
      {
        header: 'DEPTH',
        size: 80,
        cell: ({ row: { original } }) => original.size.depth,
      },
      {
        header: 'FILL',
        size: 40,
        cell: ({ row }) => `${(row.original.fillRate() * 100).toPrecision(3)}%`,
      },
      {
        id: 'selected',
        size: 40,
        cell: ({ row }) => {
          return (
            <input
              defaultChecked={row.getIsSelected()}
              type="radio"
              name="shownBin"
              value={row.original.id}
              onChange={(e) =>
                geometryDispatch({
                  type: 'setSelectedBinId',
                  binId: e.target.value,
                })
              }
            />
          );
        },
      },
    ],
    [geometryDispatch]
  );

  if (!packedBins.length) {
    return null;
  }

  const selectedIndex = bins.findIndex((bin: Bin) => bin.id === selectedBinId);
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
        <InputTable
          className={styles.table}
          columns={columns}
          data={bins}
          initialState={{ rowSelection: { [selectedIndex]: true } }}
        />
      )}
    </div>
  );
};
