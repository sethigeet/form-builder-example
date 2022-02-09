import { FC } from "react";
import Image from "next/image";
import Logo from "../../public/logo.png";

export const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between bg-blue-900 px-5 py-2">
      <div className="flex items-center">
        <Image src={Logo} alt="logo" objectFit="cover" loading="eager" />
        <span className="ml-5 text-5xl font-extrabold text-white">CMFS</span>
      </div>

      <div className="flex items-center">
        <div className="avatar h-14">GS</div>
      </div>
    </div>
  );
};
