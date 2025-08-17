import React from "react";
import SpecsUtility from "./SpecsUtility";
import { technicalFeatures } from "../../../assets/images/carDetails/types/bodyTypes";

const TechnicalFeaturesSpecs = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue);
    }
  };

  return (
    <div>
      <SpecsUtility
        specsTypes={technicalFeatures}
        onBodyTypeChange={handleSelect}
        groupName={"technicalFeatures"}
      />
    </div>
  );
};

export default TechnicalFeaturesSpecs;
