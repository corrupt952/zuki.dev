import { Config } from '@/config';
import { Menu } from 'lucide-react';
import React, { useRef } from 'react';
import LinkText from '../Elements/LinkText';

const NavigationLinks = () => {
  return (
    <>
      {Config.navigation.items.map((item) => {
        return (
          <LinkText
            href={item.href}
            key={item.name}
            className="px-4 pr-0 first-of-type:pl-0 hover:brightness-50"
          >
            {item.name}
          </LinkText>
        );
      })}
    </>
  );
};

const NavigationMenu = () => {
  const [open, setOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="block md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-4 bg-background brightness-150 py-2"
        >
          {Config.navigation.items.map((item) => {
            return (
              <LinkText
                key={item.name}
                href={item.href}
                className="block px-4 uppercase hover:brightness-50 py-2"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </LinkText>
            );
          })}
        </div>
      )}
    </>
  );
};

export const Header = () => {
  return (
    <header className="w-auto md:w-3/5 mx-4 md:mx-auto">
      <div className="flex justify-between py-3 text-white uppercase font-normal">
        <LinkText href="/" className="hover:brightness-50">
          {Config.title}
        </LinkText>
        <div className="hidden md:flex">
          <NavigationLinks />
        </div>
        <div className="flex md:hidden">
          <NavigationMenu />
        </div>
      </div>
    </header>
  );
};
