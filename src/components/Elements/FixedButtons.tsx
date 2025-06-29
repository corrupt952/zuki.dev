import { GlobeIcon } from 'lucide-react';
import { useContext, useState, useRef, useEffect } from 'react';
import { I18nContext, LOCALES } from '@/libs/i18n';
import Image from 'next/image';

export const FixedButtons = () => {
  const { locale, setLocale } = useContext(I18nContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    
    // Show tooltip on tap
    setShowTooltip(true);
    
    // Hide tooltip after 2 seconds
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    tooltipTimer.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
    
    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      window.open('https://ko-fi.com/B0B31H8NIG', '_blank');
    }, 600); // 600ms for long press
  };

  const handleTouchEnd = () => {
    // Cancel long press if touch ends early
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation on mobile (touch devices)
    if (isMobile) {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md whitespace-nowrap">
            {isMobile ? 'Long press to support' : 'Support on Ko-fi'}
            <div className="absolute bottom-0 right-2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          </div>
        )}
        <a
          href="https://ko-fi.com/B0B31H8NIG"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-md bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none"
          aria-label="Buy me a coffee on Ko-fi"
          onMouseEnter={() => !isMobile && setShowTooltip(true)}
          onMouseLeave={() => !isMobile && setShowTooltip(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
        >
          <Image 
            src="/kofi_symbol.png" 
            alt="Ko-fi" 
            width={20} 
            height={20}
            className="w-5 h-5"
          />
        </a>
      </div>
      
      <div className="flex items-center p-2 border border-gray-500 rounded-md bg-background">
        <GlobeIcon className="w-4 h-4 mx-1" />

        <select
          value={locale}
          className="border-none outline-none bg-background"
          onChange={handleChange}
        >
          {LOCALES.map((locale: string) => (
            <option key={locale} value={locale}>
              {locale.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};