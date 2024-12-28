import React from 'react';
import logo from '@/assets/images/logo.png';

export const Logo = ({ width, height }: { width: string; height: string }) => {
  return (
    <img
      src={logo.src}
      alt="logo"
      className={`hidden md:block w-[${width}] h-[${height}]`}
    />
  );
};
