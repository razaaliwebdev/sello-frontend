import React from "react";
import SpecsUtility from "./SpecsUtility";
import { exteriorColors } from "../../../assets/images/carDetails/types/bodyTypes";

const ExteriorColor = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange) {
      onChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"exteriorColors"}
        specsTypes={exteriorColors}
        onChange={handleSelect}
      />
    </div>
  );
};

export default ExteriorColor;
