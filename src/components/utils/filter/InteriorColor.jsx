import React from "react";
import SpecsUtility from "./SpecsUtility";
import { interiorColor } from "../../../assets/images/carDetails/types/bodyTypes";

const InteriorColor = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (titleValue) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"interiorColor"}
        specsTypes={interiorColor}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default InteriorColor;
