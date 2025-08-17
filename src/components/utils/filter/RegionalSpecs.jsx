import React from "react";
import { regionalSpecs } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const RegionalSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };

  return (
    <>
      <SpecsUtility
        groupName={"regionalSpecs"}
        specsTypes={regionalSpecs}
        onBodyTypeChange={handleSelect}
      />
    </>
  );
};

export default RegionalSpecs;
