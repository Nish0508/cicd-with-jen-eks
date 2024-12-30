// import relevant modules
import { expect, test, vi } from "vitest";
import { render, fireEvent } from "@testing-library/dom";
import { Button } from "./Button";

// test cases
describe("Button widget", () => {
  test("Button component", () => {
    test("renders button with correct text", () => {
      const buttonText = "Click me";
      const { getByText } = render(Button({ buttonText }));
      expect(getByText(buttonText)).toBeDefined();
    });

    test("renders button with correct type", () => {
      const buttonType = "submit";
      const { getByClassName } = render(Button({ type: buttonType }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      expect(buttonElement).toHaveAttribute("type", buttonType);
    });

    test("disables button when buttonActive is false", () => {
      const { getByClassName } = render(Button({ buttonActive: false }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      expect(buttonElement).toBeDisabled();
    });

    test("enables button when buttonActive is true", () => {
      const { getByClassName } = render(Button({ buttonActive: true }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      expect(buttonElement).not.toBeDisabled();
    });

    test("sets cursor to pointer when buttonActive is true", () => {
      const { getByClassName } = render(Button({ buttonActive: true }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      expect(buttonElement).toHaveStyle("cursor: pointer");
    });

    test("sets cursor to not-allowed when buttonActive is false", () => {
      const { getByClassName } = render(Button({ buttonActive: false }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      expect(buttonElement).toHaveStyle("cursor: not-allowed");
    });

    test("calls onClick function when button is clicked", () => {
      const handleClick = vi.fn();
      const { getByClassName } = render(Button({ onClick: handleClick }));
      const buttonElement = getByClassName("mentalyc-modal-button");
      fireEvent.click(buttonElement);
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
