import { useEffect, useState } from 'react';

type ScreenType = 'desktop' | 'smallDesktop' | 'tablet' | 'mobile';

export default function useScreenType(): ScreenType {
  const [screenType, setScreenType] = useState<ScreenType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) setScreenType('mobile');
      else if (width <= 768) setScreenType('tablet');
      else setScreenType('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenType;
}
