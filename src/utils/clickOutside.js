import { useEffect } from 'react';

export const useClickUserSide = (ref, callback) => {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current || !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
};
