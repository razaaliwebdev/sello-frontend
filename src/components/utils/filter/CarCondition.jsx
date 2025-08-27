import React from "react";
import { carCondtion } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const CarCondition = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange) {
      onChange(titleValue); // Send to parent
    }
  };
  
  return (
    <>
      <SpecsUtility
        groupName={"carCondtion"}
        specsTypes={carCondtion}
        onChange={handleSelect}
      />
    </>
  );
};

export default CarCondition;
