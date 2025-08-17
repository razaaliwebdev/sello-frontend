import React from "react";
import SpecsUtility from "./SpecsUtility";
import { numberOfCylinders } from "../../../assets/images/carDetails/types/bodyTypes";

const CylindersSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"numberofCylinders"}
        specsTypes={numberOfCylinders}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default CylindersSpecs;
