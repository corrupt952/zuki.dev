import { Mail, Github, Twitter } from 'lucide-react';
import { AvatarIcon } from '@/components/Elements/Icon';
import LinkText from '@/components/Elements/LinkText';

export default function Home() {
  const links = [
    {
      name: 'mail',
      href: 'mailto:k@zuki.dev',
      icon: <Mail className="w-8 h-8" />,
    },
    {
      name: 'github',
      href: 'https://github.com/corrupt952',
      icon: <Github className="w-8 h-8" />,
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/corrupt952',
      icon: <Twitter className="w-8 h-8" />,
    },
  ];

  return (
    <div className="container flex flex-col items-center justify-center flex-auto text-center gap-4">
      <div>
        <AvatarIcon width="12rem" />
      </div>
      <div>
        <h1 className="text-2xl font-medium truncate">K@zuki.</h1>
        <h2 className="text-xl font-medium truncate">Web Developer, SRE</h2>
      </div>
      <div>
        {links.map((link) => {
          return (
            <LinkText
              href={link.href}
              key={link.name}
              className="inline-block px-4 py-2 last:pr-4 text-inherit hover:opacity-80"
            >
              {link.icon}
            </LinkText>
          );
        })}
      </div>
    </div>
  );
}
