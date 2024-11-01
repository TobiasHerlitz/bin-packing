import { Bin, Parcel } from '@entities';
import { useGeometryDispatch, useGeometryState } from '@hooks';
import { Button, ButtonColor, ButtonSize } from '@ui';
import { SubmitHandler, useForm } from 'react-hook-form';

import { BinInputs, ParcelInputs } from './components';
import styles from './PackingControls.module.css';

export interface FormInputs {
  parcels: Parcel[];
  bins: Bin[];
}

interface PackingControlsProps {
  closeControls: () => void;
}

export const PackingControls = ({ closeControls }: PackingControlsProps) => {
  const geometryState = useGeometryState();
  const geometryDispatch = useGeometryDispatch();
  const form = useForm<FormInputs>({
    defaultValues: {
      parcels: geometryState.parcels,
      bins: geometryState.bins,
    },
  });

  const pack: SubmitHandler<FormInputs> = (data) => {
    console.log('running pack');
    geometryDispatch({
      type: 'setParcels',
      payload: data.parcels.map(
        (parcel) =>
          new Parcel({
            name: parcel.name,
            originalSize: parcel.originalSize,
            quantity: parcel.quantity,
          })
      ),
    });
    geometryDispatch({ type: 'pack' });
    closeControls();
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2>PACKING</h2>
        <Button
          icon="close"
          colorScheme={ButtonColor.BGColor}
          onClick={(e) => {
            e.preventDefault();
            closeControls();
          }}
        />
      </div>

      <form onSubmit={form.handleSubmit(pack)}>
        <ParcelInputs form={form} />
        <BinInputs form={form} />
        <div className={styles.bottomButtons}>
          <div className={styles.spreadsheetButtons}>
            <Button
              text="Import spreadsheet"
              size={ButtonSize.Medium}
              colorScheme={ButtonColor.BGColor}
              icon="upload"
              onClick={(e) => {
                e.preventDefault();
                console.log('Import spreadsheet');
              }}
            />
            <Button
              text="Export spreadsheet"
              size={ButtonSize.Medium}
              colorScheme={ButtonColor.BGColor}
              icon="download"
              onClick={(e) => {
                e.preventDefault();
                console.log('Export spreadsheet');
              }}
            />
          </div>
          <Button
            className={styles.submitButton}
            type="submit"
            text="CALCULATE"
            size={ButtonSize.Large}
            colorScheme={ButtonColor.Secondary}
          />
        </div>
      </form>
    </div>
  );
};
