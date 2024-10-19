import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import useOrientation from 'screen-orientation';

const useScreenType = () => {
  const [screenType, setScreenType] = useState('');

  const isMobileDevice = isMobile;
  const isTabletDevice = isTablet;
  const isDesktopDevice = isDesktop;
  const { orientation } = useOrientation();

  const isSmallScreen = useMediaQuery({ maxWidth: 639 });
  const isTabletScreen = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktopScreen = useMediaQuery({ minWidth: 1024 });

  // Use device detection libraries for primary classification
  useEffect(() => {
    if (isMobileDevice) {
      setScreenType('mobile');
    } else if (isTabletDevice) {
      setScreenType('tablet');
    } else if (isDesktopDevice) {
      setScreenType('desktop');
    }
  }, [isMobileDevice, isTabletDevice, isDesktopDevice]);

  // Use media queries and orientation for further refinement
  useEffect(() => {
    const handleScreenResize = () => {
      if (isSmallScreen) {
        setScreenType('mobile');
      } else if (isTabletScreen) {
        setScreenType('tablet');
      } else if (isDesktopScreen) {
        setScreenType('desktop');
      }

      // Update screenType based on orientation (optional)
    //   const newScreenType = orientation.isPortrait ? `${screenType}-portrait` : `${screenType}-landscape`;
    //   if (newScreenType !== screenType) {
    //     setScreenType(newScreenType);
    //   }
    };

    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);

    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, [isSmallScreen, isTabletScreen, isDesktopScreen, screenType]);

  return screenType;
};

export default useScreenType;