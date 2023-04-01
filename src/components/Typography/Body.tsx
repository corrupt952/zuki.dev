import { Typography } from "@mui/material";

export const Body = ({ children, ...props }: { children: React.ReactNode, props?: any }) => {
  return (
    <Typography
      variant="body1"
      color="textSecondary"
      gutterBottom
      {...props}
    >
      {children}
    </Typography>
  );
};
