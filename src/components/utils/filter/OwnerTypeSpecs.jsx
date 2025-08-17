import React from "react";
import SpecsUtility from "./SpecsUtility";
import { ownerType } from "../../../assets/images/carDetails/types/bodyTypes";

const OwnerTypeSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility
        groupName={"ownerType"}
        specsTypes={ownerType}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default OwnerTypeSpecs;
