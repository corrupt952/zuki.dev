export const Body = ({
  children,
  ...props
}: {
  children: React.ReactNode
  props?: any
}) => {
  return (
    <p className="text-gray-400 mb-4" {...props}>
      {children}
    </p>
  )
}
