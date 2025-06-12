import { useState, useEffect } from 'react';
import { WindowDimensions } from '../types'; // Adjust path if needed

const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile = width < 600;
  
  return {
    width,
    height,
    isMobile
  };
};

export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
