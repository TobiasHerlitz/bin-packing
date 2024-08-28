import { RefObject, useEffect } from 'react';

interface useClickOutsideProps {
  callback: () => void;
  refs: RefObject<HTMLElement | undefined>[];
}

export const useClickOutside = ({ refs, callback }: useClickOutsideProps) => {
  const handleClick = ({ target }: MouseEvent) => {
    if (!(target instanceof Node)) {
      return;
    }

    const usedRefs = refs.filter((ref) => ref.current);

    if (usedRefs.length === 0) return;

    const isOutside = usedRefs.every((ref) => !ref.current!.contains(target));

    if (isOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
