import React from "react";
import SpecsUtility from "./SpecsUtility";
import { warrantyType } from "../../../assets/images/carDetails/types/bodyTypes";

const WarrantyType = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };
  return (
    <div>
      <SpecsUtility specsTypes={warrantyType} onBodyTypeChange={handleSelect} />
    </div>
  );
};

export default WarrantyType;
