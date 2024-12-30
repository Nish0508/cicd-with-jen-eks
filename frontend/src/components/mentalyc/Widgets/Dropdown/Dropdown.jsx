// import select from react-select
import Select from "react-select";

// custom styles for select dropdown
// TODO
// should be moved to utils but here for now
const dropDownCustomStyles = {
  container: provided => ({
    width: "100%"
  }),
  // input styles
  input: (provided, { isDisabled }) => ({
    ...provided,
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
    lineHeight: "20px",
    width: "100%",
    padding: "0.5rem 0rem",
    cursor: isDisabled ? "not-allowed" : "default"
  }),

  // when a value from the dropdown is populated, the styles
  singleValue: provided => ({
    ...provided,
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem"
  }),
  // the control styles
  control: (provided, state) => ({
    ...provided,
    background: "white",
    border: "1px solid #f2f2f2",
    borderColor: state.isFocused ? "none" : "none",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      border: "1px solid #731054",
      backgroundColor: "#ffffff"
    },
    "&:focus-within": {
      border: "1px solid #731054",
      backgroundColor: "#ffffff"
    },
    width: "80%",
    margin: "auto"
  }),
  // indicator separator styles
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "#B2B2B2",
    transform: state.isFocused ? "rotate(180deg)" : null,
    transition: "transform 0.2s ease-in-out"
  }),
  // select option styles
  option: (provided, { isDisabled }) => ({
    ...provided,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
    color: "black",
    fontSize: "16px",
    fontFamily: "Inter",
    fontWeight: 400,
    // marginTop: "-0.8rem",
    lineHeight: "20px",
    backgroundColor: isDisabled ? "#EFEFEF" : "white",
    cursor: "pointer",
    "&:active": {
      backgroundColor: isDisabled ? "#EFEFEF" : "#D6E4F4"
    },
    "&:hover": {
      backgroundColor: isDisabled ? "#EFEFEF" : "#D6E4F4"
    }
  }),
  menu: provided => ({
    ...provided,
    border: "1px solid #ffffff",
    filter: "drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.1))",
    zIndex: "100"
  }),
  menuList: (provided, state, base) => ({
    ...base,
    ...provided,
    overflowY: "auto",
    maxHeight: "13em",
    scrollbarWidth: "thin",
    scrollbarColor: "#731054 #f5f5f5",
    webkitScrollbar: {
      width: "6px",
      backgroundColor: "#F5F5F5",
      borderRadius: "5px",
      backgroundClip: "padding-box"
    },
    "::-webkit-scrollbar": {
      width: "6px",
      backgroundColor: "#F5F5F5",
      borderRadius: "5px",
      backgroundClip: "padding-box"
    },
    webkitScrollbarTrack: {
      backgroundColor: "#F5F5F5",
      borderRadius: "5px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundClip: "padding-box"
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "#F5F5F5",
      borderRadius: "5px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundClip: "padding-box"
    },
    webkitScrollbarThumb: {
      backgroundColor: "#731054",
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      borderRadius: "5px",
      backgroundClip: "padding-box"
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#731054",
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      borderRadius: "5px",
      backgroundClip: "padding-box"
    }
  }),
  // placeholder styles
  placeholder: provided => ({
    ...provided,
    color: "black",
    fontFamily: "Inter, sans-serif"
  })
};

// JSX Component with props
export const DropdownSelect = ({ options, value, placeholder, setChange }) => {
  // building block
  return (
    <Select
      defaultValue={value ? value : placeholder}
      styles={dropDownCustomStyles}
      options={options}
      placeholder={placeholder}
      onChange={e => {
        setChange(e);
      }}
    />
  );
};
