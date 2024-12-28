import avatar from '@/assets/images/avatar.jpg';

type AvatarIconProps = {
  width?: string;
  height?: string;
};

export const AvatarIcon = ({
  width = '1rem',
  height = 'auto',
}: AvatarIconProps) => {
  return (
    <img
      src={avatar.src}
      alt="avatar"
      className="rounded-full object-cover"
      style={{ width, height }}
    />
  );
};
