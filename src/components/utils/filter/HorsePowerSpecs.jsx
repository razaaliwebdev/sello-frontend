import React from "react";
import { horsePower } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const HorsePowerSpecs = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange) {
      onChange(titleValue); // Send to parent
    }
  };

  return (
    <div>
      <SpecsUtility
        groupName={"horsePower"}
        specsTypes={horsePower}
        onChange={handleSelect}
      />
    </div>
  );
};

export default HorsePowerSpecs;
