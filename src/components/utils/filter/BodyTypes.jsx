import React from "react";
import { bodyTypes } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const BodyTypes = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };

  return (
    <>
      <SpecsUtility
        groupName={"bodyTypes"}
        specsTypes={bodyTypes}
        onBodyTypeChange={handleSelect}
      />
    </>
  );
};

export default BodyTypes;
