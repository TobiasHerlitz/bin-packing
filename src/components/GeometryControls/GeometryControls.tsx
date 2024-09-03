import { useGeometryDispatch, useGeometryState } from '@hooks';
import { Bin, Parcel } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Bins, Parcels } from './components';
import styles from './GeometryControls.module.css';

export interface FormInputs {
  parcels: Parcel[];
  bins: Bin[];
}

interface GeometryControlsProps {
  closeControls: () => void;
}

export const GeometryControls = ({ closeControls }: GeometryControlsProps) => {
  const geometryState = useGeometryState();
  const geometryDispatch = useGeometryDispatch();
  const form = useForm<FormInputs>({
    defaultValues: {
      parcels: geometryState.parcels,
      bins: geometryState.bins,
    },
  });

  const pack: SubmitHandler<FormInputs> = (data) => {
    geometryDispatch({ type: 'setParcels', payload: data.parcels });
    geometryDispatch({ type: 'pack' });
    closeControls();
  };

  return (
    <div className={styles.root}>
      <h2>Geometry Controls</h2>
      <hr />
      <form onSubmit={form.handleSubmit(pack)}>
        <Parcels form={form} />
        <hr />
        <Bins form={form} />
        <hr />
        <button className={styles.submitButton} type="submit">
          Pack
        </button>
      </form>
    </div>
  );
};
