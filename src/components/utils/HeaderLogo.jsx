import React from "react";
import { images } from "../../assets/assets";

const HeaderLogo = () => {
  return (
    <div className="w-full my-3">
      <div className="w-80 mx-auto rounded-tl-[35px] rounded-br-[35px] bg-primary-500 md:h-36 flex items-center justify-center">
        <img src={images.logo} className="h-36" alt="" />
      </div>
    </div>
  );
};

export default HeaderLogo;
