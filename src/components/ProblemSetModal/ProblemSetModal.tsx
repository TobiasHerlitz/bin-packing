import { BRSets } from '@problemSets';
import { useGeometryDispatch } from '@stateHooks';
import { Button, ButtonColor, ButtonSize, Modal, Select } from '@ui';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './ProblemSetModal.module.css';

interface ProblemSetModalProps {
  show: boolean;
  closeModal: () => void;
}

interface ProblemSetData {
  problemSet: string;
  problem: string;
}

export const ProblemSetModal = ({ show, closeModal }: ProblemSetModalProps) => {
  const { handleSubmit, register, watch, setValue } = useForm<ProblemSetData>(
    {}
  );
  const geometryDispatch = useGeometryDispatch();

  if (!show) {
    return;
  }

  const problemSetOptions = [
    {
      label: 'Select problem set',
      value: '',
    },
    {
      label: 'Bischoff & Ratcliff - Set 1',
      value: 'BR1',
    },
    {
      label: 'Bischoff & Ratcliff - Set 2',
      value: 'BR2',
    },
    {
      label: 'Bischoff & Ratcliff - Set 3',
      value: 'BR3',
    },
    {
      label: 'Bischoff & Ratcliff - Set 4',
      value: 'BR4',
    },
    {
      label: 'Bischoff & Ratcliff - Set 5',
      value: 'BR5',
    },
    {
      label: 'Bischoff & Ratcliff - Set 6',
      value: 'BR6',
    },
    {
      label: 'Bischoff & Ratcliff - Set 7',
      value: 'BR7',
    },
  ];

  const problemSet = watch('problemSet');

  const problemOptions = [
    {
      label: 'Select problem',
      value: '',
    },
    ...(problemSet
      ? new Array(10)
          .fill(null)
          .map((_, i) => ({ label: `Problem ${i + 1}`, value: i + 1 }))
      : []),
  ];

  const loadProblem: SubmitHandler<ProblemSetData> = ({
    problemSet,
    problem,
  }) => {
    const selectedSet = BRSets[problemSet];
    const selectedProblem = selectedSet.find(
      ({ problemNumber }) => Number(problem) === problemNumber
    );
    if (!selectedProblem) {
      console.error('Could not find problem');
      return;
    }

    geometryDispatch({
      type: 'setParcels',
      payload: selectedProblem.parcels,
    });

    geometryDispatch({
      type: 'setBins',
      payload: [selectedProblem.bin],
    });

    closeModal();
  };

  return (
    <Modal closeModal={closeModal} heading="Load problem">
      <form onSubmit={handleSubmit(loadProblem)} className={styles.modalBody}>
        <Select
          options={problemSetOptions}
          register={register('problemSet', {
            onChange: () => setValue('problem', ''),
          })}
        />
        <Select
          disabled={problemOptions.length === 1}
          register={register('problem')}
          options={problemOptions}
        />
        <Button
          disabled={!watch('problem')}
          className={styles.loadButton}
          size={ButtonSize.Medium}
          colorScheme={ButtonColor.Secondary}
          text="Load"
          icon="upload"
          type="submit"
        />
      </form>
    </Modal>
  );
};
