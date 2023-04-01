import { Typography } from "@mui/material";

export const Heading = ({ children, ...props }: { children: React.ReactNode}) => {
  return (
    <Typography variant="h4" align="center" color="textPrimary" textTransform="uppercase" gutterBottom {...props}>
      {children}
    </Typography>
  );
};
