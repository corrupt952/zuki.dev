export const Heading = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <h2
      className="text-4xl mb-4 text-center uppercase brightness-200"
      {...props}
    >
      {children}
    </h2>
  );
};
