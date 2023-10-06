import { type ReactNode } from "react";

const MainLayout = ({
  children,
  header,
  subHeader,
  action,
}: {
  children: ReactNode;
  header: string;
  subHeader?: string;
  action?: ReactNode;
}) => {
  return (
    <div className="px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">{header}</div>
          <div className="text-hint">{subHeader}</div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
