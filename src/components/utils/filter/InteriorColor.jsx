import React from "react";
import SpecsUtility from "./SpecsUtility";
import { interiorColor } from "../../../assets/images/carDetails/types/bodyTypes";

const InteriorColor = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange && titleValue) {
      onChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"interiorColor"}
        specsTypes={interiorColor}
        onChange={handleSelect}
      />
    </div>
  );
};

export default InteriorColor;
