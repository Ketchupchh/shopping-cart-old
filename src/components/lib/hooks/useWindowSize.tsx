import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

function handleResize(setWindowSize: React.Dispatch<React.SetStateAction<WindowSize>>) {
  setWindowSize({ width: window.innerWidth, height: window.innerHeight });
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    handleResize(setWindowSize);

    window.addEventListener('resize', () => handleResize(setWindowSize));

    return () => {
      window.removeEventListener('resize', () => handleResize(setWindowSize));
    };
  }, []);

  return windowSize;
}