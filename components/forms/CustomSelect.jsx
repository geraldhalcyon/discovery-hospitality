import React from "react";
import ReactSelect from "react-select";
const CustomSelect = ({ ...props }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f1f1f1" : "white",
      "&:hover, &:focus, &:active": {
        backgroundColor: "#f1f1f1",
      },
      pointerEvents: state.isSelected ? "none" : "auto",
      opacity: state.isSelected ? 0.5 : 1,
      cursor: state.isSelected ? "not-allowed" : "pointer",
    }),
  };

  return <ReactSelect {...props} styles={customStyles}></ReactSelect>;
};

export default CustomSelect;
