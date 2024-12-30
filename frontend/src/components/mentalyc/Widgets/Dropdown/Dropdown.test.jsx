// import relevant modules
import { DropdownSelect } from "./Dropdown";
import { render, fireEvent } from "@testing-library/dom";

// TODO
// improve this test
test("DropdownSelect", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
  const placeholder = "Select an option";
  const setChange = () => {};

  it("renders with placeholder", () => {
    const { getByText } = render(
      <DropdownSelect options={options} placeholder={placeholder} setChange={setChange} />
    );
    expect(getByText(placeholder)).toBeInTheDocument();
  });
});
