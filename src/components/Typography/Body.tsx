export const Body = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`text-gray-400 mb-4 ${className || ''}`} {...props}>
      {children}
    </p>
  );
};
