export const Heading = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={`text-4xl mb-4 text-center uppercase text-white ${className || ''}`}
      {...props}
    >
      {children}
    </h2>
  );
};
