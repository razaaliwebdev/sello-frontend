import React from "react";
import SpecsUtility from "./SpecsUtility";
import { engineCapacityCC } from "../../../assets/images/carDetails/types/bodyTypes";

const EngineCapacitySpecs = (onBodyTypeChange) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };

  return (
    <div>
      <SpecsUtility
        specsTypes={engineCapacityCC}
        groupName={"engineCapacity"}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default EngineCapacitySpecs;
