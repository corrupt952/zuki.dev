export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center flex-auto self-baseline mb-12">
      <div className="w-full md:w-3/4">{children}</div>
    </div>
  );
};
