import { useCallback, useEffect } from 'react';

interface useKeypressProps {
  key: KeyboardEvent['key'];
  callback: () => void;
}

export const useKeypress = ({ key, callback }: useKeypressProps) => {
  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    },
    [callback, key]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);

    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);
};
