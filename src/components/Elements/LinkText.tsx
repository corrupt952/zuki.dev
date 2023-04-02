import { Config } from "@/config";
import { DEFAULT_LOCALE, I18nContext } from "@/libs/i18n";
import { styled } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

const linkOptions = {
  textDecoration: "none",
  color: Config.theme.palette.secondary.main,
  ":hover": {
    textDecoration: "underline",
    filter: "brightness(50%)",
  },
};

const StyledInnerLink = styled(Link)(linkOptions);
const StyledOuterLink = styled("a")(linkOptions);

export const LinkText = (props: any) => {
  const { locale } = useContext(I18nContext);
  const { href } = props;

  if (href?.startsWith("/")) {
    const path = locale === DEFAULT_LOCALE ? href : `/${locale}${href}`;
    return <StyledInnerLink {...props} href={path} />;
  } else {
    return <StyledOuterLink {...props} target="_blank" />;
  }
};
