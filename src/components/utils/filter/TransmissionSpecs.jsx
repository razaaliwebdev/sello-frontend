import React from "react";
import SpecsUtility from "./SpecsUtility";
import { transmissionType } from "../../../assets/images/carDetails/types/bodyTypes";

const TransmissionSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"transmissionType"}
        specsTypes={transmissionType}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default TransmissionSpecs;
