import React from "react";
import SpecsUtility from "./SpecsUtility";
import { exteriorColors } from "../../../assets/images/carDetails/types/bodyTypes";

const ExteriorColor = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        specsTypes={exteriorColors}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default ExteriorColor;
