import { Toggle } from '@ui';
import { UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../PackingControls';
import styles from './PackingInstructions.module.css';

interface PackingInstructionsProps {
  form: UseFormReturn<FormInputs>;
}

export const PackingInstructions = ({ form }: PackingInstructionsProps) => {
  const { register } = form;
  return (
    <div className={styles.packingInstructions}>
      <Toggle
        disabled
        id="rotationAllowed"
        register={register('packingInstructions.rotationAllowed')}
      >
        Allow rotation
      </Toggle>
      <Toggle
        id="useMultipleBins"
        register={register('packingInstructions.useMultipleBins')}
      >
        Use multiple bins
      </Toggle>
    </div>
  );
};
