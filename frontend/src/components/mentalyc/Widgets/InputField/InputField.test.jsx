// import relevant modules
import { describe, expect, test } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

// input field component testcase
describe("InputField component", () => {
  test("renders the label and input correctly", () => {
    const { getByLabelText } = render(
      <InputField label="Email Address" name="email" type="email" />
    );
    const labelElement = getByLabelText(/email address/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("name", "email");
    expect(labelElement).toHaveAttribute("type", "email");
  });

  test("displays error message when input is invalid", () => {
    const { getByLabelText, getByText } = render(
      <InputField label="Email Address" name="email" type="email" onChange={() => {}} />
    );
    const inputElement = getByLabelText(/email address/i);
    fireEvent.change(inputElement, { target: { value: "invalid email" } });
    expect(getByText(/invalid email/i)).toBeInTheDocument();
  });

  test("displays password input with show/hide password icon", () => {
    const { getByLabelText, getByAltText } = render(
      <InputField label="Password" name="password" type="password" />
    );
    const inputElement = getByLabelText(/password/i);
    const iconElement = getByAltText(/eye icon/i);
    expect(inputElement).toHaveAttribute("type", "password");
    fireEvent.click(iconElement);
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
