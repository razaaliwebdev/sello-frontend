import React from "react";
import { horsePower } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const HorsePowerSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };

  return (
    <div>
      <SpecsUtility
        groupName={"horsePower"}
        specsTypes={horsePower}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default HorsePowerSpecs;
