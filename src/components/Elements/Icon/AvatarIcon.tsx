import { Avatar } from '@mui/material'
import avatar from '@/assets/images/avatar.jpg'

type AvatarIconProps = {
  width?: string
  height?: string
}

export const AvatarIcon = ({
  width = '1rem',
  height = 'auto',
}: AvatarIconProps) => {
  return (
    <Avatar
      src={avatar.src}
      alt="avatar"
      sx={{ width: width, height: height }}
    />
  )
}
