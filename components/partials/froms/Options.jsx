import React from "react";
import Select from "react-select";
// Fixed Options Select

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

// start component
const OptionsSelect = ({
  // categories,
  placeholder = "Select Option",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  readonly,
  value,
  disabled,
  id,
  onChange,
  options,
  defaultValue,

  size,
  ...rest
}) => {
  // console.log('categories', categories);

  return (
    <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div>
        <label className="form-label" htmlFor="mul_1">
          Multi Select..
        </label>
        <Select
          isClearable={false}
          defaultValue={defaultValue}
          styles={styles}
          isMulti
          name="colors"
          options={options}
          value={value}
          onChange={onChange}
          className={`${className} react-select`}
          classNamePrefix="select"
          id="mul_1"
        />
      </div>
    </div>
  );
};

export default OptionsSelect;
