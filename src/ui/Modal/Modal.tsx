import { useClickOutside } from '@hooks';
import { Button, ButtonColor } from '@ui';
import { ReactNode, useRef } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  heading: string;
  closeModal: () => void;
  children: ReactNode;
}

export const Modal = ({ heading, closeModal, children }: ModalProps) => {
  document.body.style.overflow = 'hidden';
  const modalBody = useRef(null);
  useClickOutside({
    refs: [modalBody],
    callback: closeModal,
  });

  return (
    <div className={styles.root}>
      <div ref={modalBody} className={styles.modal}>
        <div className={styles.header}>
          <h3>{heading}</h3>
          <Button
            colorScheme={ButtonColor.BGColor}
            icon="close"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
