import React from "react";
import { numberOfSeats } from "../../../assets/images/carDetails/types/bodyTypes";
import SpecsUtility from "./SpecsUtility";

const Seats = ({ onBodyTypeChange }) => {
  const handleSelect = (titleValue) => {
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };
  return (
    <div>
      <SpecsUtility
        specsTypes={numberOfSeats}
        onBodyTypeChange={handleSelect}
      />
    </div>
  );
};

export default Seats;
