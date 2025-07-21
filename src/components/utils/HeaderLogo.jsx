import React from "react";
import { images } from "../../assets/assets";

const HeaderLogo = () => {
  return (
    <div className="p-4">
      <img className="w-32 md:w-40" src={images.headerLogo} alt="Logo" />
    </div>
  );
};

export default HeaderLogo;
