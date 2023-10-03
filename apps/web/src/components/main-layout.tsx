import { type ReactNode } from "react";

const MainLayout = ({
  children,
  header,
  subHeader,
}: {
  children: ReactNode;
  header: string;
  subHeader?: string;
}) => {
  return (
    <div className="px-4 py-8">
      {subHeader ? (
        <div className="mb-6">
          <div className="text-xl font-bold">{header}</div>
          <div className="text-hint">{subHeader}</div>
        </div>
      ) : (
        <div className="mb-6 text-xl font-bold">{header}</div>
      )}

      {children}
    </div>
  );
};

export default MainLayout;
