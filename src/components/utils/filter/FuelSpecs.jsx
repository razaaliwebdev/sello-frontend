import React from "react";
import SpecsUtility from "./SpecsUtility";
import { fuelType } from "../../../assets/images/carDetails/types/bodyTypes";

const FuelSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };

  return (
    <div>
      <SpecsUtility
        groupName={"fuelType"}
        specsTypes={fuelType}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default FuelSpecs;
