// import React from "react";

// const Input = ({ inputType }) => {
//   return (
//     <input
//       type={inputType}
//       className="w-full border-[1px] border-gray-500 rounded-md p-1.5 outline-primary-500 text-lg "
//     />
//   );
// };

// export default Input;

// src/utils/filter/Input.js
import React from "react";

const Input = ({ inputType, value, onChange, placeholder }) => {
  return (
    <input
      type={inputType}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
  );
};

export default Input;
