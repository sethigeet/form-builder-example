import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[60px] items-center justify-between bg-blue-900 px-6 py-2">
      <span className="text-lg font-bold text-white">&copy; 2021 Kalpataru Computer Services</span>
      <span className="text-lg text-white">
        Licensed to: <b>Kalpataru Computer Services</b>
      </span>
    </div>
  );
};
