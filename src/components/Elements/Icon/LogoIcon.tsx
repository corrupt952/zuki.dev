import logo from '@/assets/images/logo.png';

export const Logo = ({ width, height }: { width: string; height: string }) => {
  return (
    // biome-ignore lint/performance/noImgElement: the site is a static export with images.unoptimized, so next/image adds nothing here
    <img
      src={logo.src}
      alt="logo"
      className={`hidden md:block w-[${width}] h-[${height}]`}
    />
  );
};
