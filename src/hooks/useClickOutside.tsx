import { RefObject, useEffect } from 'react';

interface useClickOutsideProps {
  callback: () => void;
  refs: RefObject<HTMLElement | undefined>[];
}

const DRAG_DISTANCE = 6;

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
    let startX: number;
    let startY: number;

    const setMouseDownPosition = (e: MouseEvent) => {
      startX = e.pageX;
      startY = e.pageY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      const diffX = Math.abs(e.pageX - startX);
      const diffY = Math.abs(e.pageY - startY);

      if (diffX < DRAG_DISTANCE && diffY < DRAG_DISTANCE) {
        handleClick(e);
      }
    };

    document.addEventListener('mousedown', setMouseDownPosition);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', setMouseDownPosition);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
};
