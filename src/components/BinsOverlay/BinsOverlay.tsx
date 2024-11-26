import { Bin, Parcel } from '@entities';
import { useGeometryDispatch, useGeometryState } from '@stateHooks';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Button, ButtonColor, Table } from '@ui';
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
        cell: ({ row }) => {
          return (
            <Button
              onClick={row.getToggleExpandedHandler()}
              icon={row.getIsExpanded() ? 'unfold_less' : 'unfold_more'}
              colorScheme={ButtonColor.BGColor}
            />
          );
        },
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

  const renderExpandedBin = (row: Row<Bin>) => {
    const columns: ColumnDef<Parcel>[] = [
      {
        id: 'name',
        size: 260,
        cell: ({ row: { original } }) => original.name,
      },
      {
        id: 'width',
        size: 80,
        cell: ({ row: { original } }) => original.getRotatedSize().width,
      },
      {
        id: 'height',
        size: 80,
        cell: ({ row: { original } }) => original.getRotatedSize().height,
      },
      {
        id: 'depth',
        size: 80,
        cell: ({ row: { original } }) => original.getRotatedSize().depth,
      },
    ];
    return (
      <Table
        className={styles.subTable}
        data={row.original.parcels}
        columns={columns}
        noHeader
      />
    );
  };

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
        <Table
          className={styles.table}
          columns={columns}
          data={bins}
          renderExpandedRow={renderExpandedBin}
          initialState={{ rowSelection: { [selectedIndex]: true } }}
        />
      )}
    </div>
  );
};
