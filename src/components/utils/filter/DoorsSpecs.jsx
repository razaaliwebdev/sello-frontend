import React from "react";
import SpecsUtility from "./SpecsUtility";
import { doors } from "../../../assets/images/carDetails/types/bodyTypes";

const DoorsSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"doors"}
        specsTypes={doors}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default DoorsSpecs;
