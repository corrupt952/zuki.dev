import { Config } from "@/config";
import { DEFAULT_LOCALE, I18nContext } from "@/libs/i18n";
import { styled } from "@mui/material";
import Link from "next/link";
import { forwardRef, useContext } from "react";

const linkOptions = {
  textDecoration: "none",
  color: Config.theme.palette.secondary.main,
  ":hover": {
    textDecoration: "underline",
    filter: "brightness(50%)",
  },
};

const StyledInnerLink = styled(Link)(linkOptions);

export const LinkText = forwardRef((props: any, ref) => {
  const { locale } = useContext(I18nContext);
  const { href, ...linkProps } = props;
  let uri = href;
  let target = "_self";
  let rel = "noopener noreferrer";

  if (uri.startsWith("/")) {
    uri = locale === DEFAULT_LOCALE ? href : `/${locale}${href}`;
  } else {
    target = "_blank";
  }

  return (
    <StyledInnerLink
      {...linkProps}
      href={uri}
      ref={ref}
      target={target}
      rel={rel}
    />
  );
});
