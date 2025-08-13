import React from "react";
import { bodyTypes } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const BodyTypes = ({ onBodyTypeChange }) => {
  const handleSelect = (name) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(name); // Send to parent
    }
  };

  return (
    <>
      <SpecsUtility bodyTypes={bodyTypes} onBodyTypeChange={handleSelect} />
    </>
  );
};

export default BodyTypes;
