import { Config } from "@/config";
import { styled } from "@mui/material";
import Link from "next/link";

const linkOptions = {
  textDecoration: 'none',
  color: Config.theme.palette.secondary.main,
  ':hover': {
    textDecoration: 'underline',
    filter: 'brightness(50%)',
  },
}

const StyledInnerLink = styled(Link)(linkOptions)
const StyledOuterLink = styled('a')(linkOptions)

export const LinkText = (props: any) => {
  const { href } = props
  if (href.startsWith('/')) {
    return <StyledInnerLink href={href} {...props}></StyledInnerLink>
  } else {
    return <StyledOuterLink {...props} target='_blank' />
  }
}
