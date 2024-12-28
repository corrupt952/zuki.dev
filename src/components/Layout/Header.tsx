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
            className="text-foreground px-4 py-3 pr-0 first-of-type:pl-0 hover:text-gray-400"
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
  const anchorEl = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={anchorEl}
        onClick={() => setOpen(true)}
        className="block md:hidden p-2"
      >
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <div className="absolute top-full right-0 bg-background md:hidden">
          {Config.navigation.items.map((item) => {
            return (
              <LinkText
                key={item.name}
                href={item.href}
                className="block text-foreground px-4 py-3 hover:text-gray-400 uppercase font-bold"
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
    <header className="bg-transparent shadow-none uppercase font-bold px-6">
      <div className="p-0 m-0">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between">
              <div className="flex">
                <LinkText
                  href="/"
                  className="text-foreground py-3 hover:text-gray-400"
                >
                  {Config.title}
                </LinkText>
              </div>
              <div className="hidden md:flex">
                <NavigationLinks />
              </div>
              <div className="flex md:hidden">
                <NavigationMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
