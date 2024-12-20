import { ProblemSetModal } from '@components';
import { Bin, Parcel } from '@entities';
import { useGeometryDispatch, useGeometryState } from '@stateHooks';
import { PackingInstructions as PackingInstructionsType } from '@types';
import { Button, ButtonColor, ButtonSize } from '@ui';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { BinInputs, PackingInstructions, ParcelInputs } from './components';
import styles from './PackingControls.module.css';

export interface FormInputs {
  parcels: Parcel[];
  bins: Bin[];
  packingInstructions: PackingInstructionsType;
}

interface PackingControlsProps {
  closeControls: () => void;
}

export const PackingControls = ({ closeControls }: PackingControlsProps) => {
  const [showProblemSetModal, setShowProblemSetModal] = useState(false);
  const { parcels, bins } = useGeometryState();
  const geometryDispatch = useGeometryDispatch();

  const form = useForm<FormInputs>({
    defaultValues: {
      parcels: parcels,
      bins: bins,
      packingInstructions: {
        rotationAllowed: true,
        useMultipleBins: true,
      },
    },
  });
  const { setValue, handleSubmit } = form;

  // Force rerender on state change as defaultValues is cached
  useEffect(() => {
    setValue('parcels', parcels);
    setValue('bins', bins);
  }, [parcels, bins, setValue]);

  const pack: SubmitHandler<FormInputs> = (data) => {
    geometryDispatch({
      type: 'setParcels',
      payload: data.parcels.map(
        (parcel) =>
          new Parcel({
            name: parcel.name,
            originalSize: parcel.originalSize,
            quantity: Number(parcel.quantity),
          })
      ),
    });
    geometryDispatch({ type: 'pack' });
    closeControls();
  };

  return (
    <>
      <form className={styles.packingControls} onSubmit={handleSubmit(pack)}>
        <div>
          <ParcelInputs form={form} />
          <BinInputs form={form} />
          <PackingInstructions form={form} />
        </div>
        <div className={styles.bottomButtons}>
          <Button
            text="Load problem set"
            size={ButtonSize.Medium}
            colorScheme={ButtonColor.BGColor}
            icon="upload"
            onClick={(e) => {
              e.preventDefault();
              setShowProblemSetModal(true);
            }}
          />
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
      <ProblemSetModal
        show={showProblemSetModal}
        closeModal={() => {
          setShowProblemSetModal(false);
        }}
      />
    </>
  );
};
