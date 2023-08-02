import { useEffect } from 'react';

export const useKeyPress = (keyboardKeyCode, actionFunc) => {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === keyboardKeyCode.toLowerCase()) {
        actionFunc();
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [keyboardKeyCode, actionFunc]);
};
