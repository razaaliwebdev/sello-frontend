import React from "react";
import SpecsUtility from "./SpecsUtility";
import { technicalFeatures } from "../../../assets/images/carDetails/types/bodyTypes";

const TechnicalFeaturesSpecs = ({ onChange }) => {
  const handleSelect = (titleValue) => {
    if (onChange) {
      onChange(titleValue);
    }
  };

  return (
    <div>
      <SpecsUtility
        specsTypes={technicalFeatures}
        onChange={handleSelect}
        groupName={"technicalFeatures"}
      />
    </div>
  );
};

export default TechnicalFeaturesSpecs;
