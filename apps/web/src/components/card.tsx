import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-4">
      {children}
    </div>
  );
};

export default Card;
