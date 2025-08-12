import React from "react";

const Input = ({ inputType }) => {
  return (
    <input
      type={inputType}
      className="w-full border-[1px] border-gray-500 rounded-md p-1.5 outline-primary-500 text-lg "
    />
  );
};

export default Input;
