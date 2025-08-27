import React from "react";
import SpecsUtility from "./SpecsUtility";
import { fuelType } from "../../../assets/images/carDetails/types/bodyTypes";

const FuelSpecs = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange) {
      onChange(titleValue);
    }
  };

  return (
    <div>
      <SpecsUtility
        groupName={"fuelType"}
        specsTypes={fuelType}
        onChange={handleSelect}
      />
    </div>
  );
};

export default FuelSpecs;
