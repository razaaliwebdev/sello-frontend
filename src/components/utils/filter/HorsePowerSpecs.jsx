import React from "react";
import { horsePower } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const HorsePowerSpecs = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    let transformedValue = "N/A";
    if (titleValue && titleValue !== "N/A") {
      const [min] = titleValue.split("-").map((v) => parseInt(v)) || [];
      transformedValue = titleValue.includes("+") ? "900 HP" : `${min} HP`;
    }
    if (onChange) {
      onChange(transformedValue);
    }
  };

  return (
    <div>
      <SpecsUtility
        groupName="horsepower"
        specsTypes={horsePower}
        onChange={handleSelect}
      />
    </div>
  );
};

export default HorsePowerSpecs;
