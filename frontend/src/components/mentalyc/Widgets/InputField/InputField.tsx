// import relevant modules
import React, { useState, useEffect, forwardRef } from "react";
import "./InputField.scss";

//import relevant icons
import eye_hide_icon from "../../../../assets/icons/Eye(1).svg";
import eye_icon from "../../../../assets/icons/Eye.svg";
import searchInputIcon from "@/assets/icons/Search-Input.svg";

// import relevant regex for input validation
import { isValidEmail, isStrongPassword } from "../../../../utils/validate";
import clsx from "clsx";

// input field component
type Ref = HTMLInputElement;
type InputFieldProps = {
  value: string;
  type?: string;
  name?: string;
  id?: string;
  isCompulsory?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  shouldValidate?: boolean;
  minLength?: number;
  disabled?: boolean;
  passwordCheck?: boolean;

  onValidityChange?: (isValid: boolean) => void;
  inputAttrs?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  className?: {
    inputContainer?: string;
    label?: string;
    input?: string;
  };
  style?: React.CSSProperties;
  inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchInput?: boolean;
  wrapperClassName?: string;
};

const InputField = forwardRef<Ref, InputFieldProps>(function InputField(
  {
    type,
    name,
    value,
    isCompulsory = false,
    onChange,
    label,
    placeholder,
    shouldValidate,
    minLength,
    onValidityChange,
    inputAttrs = {},
    className = {},
    style = {},
    disabled = false,
    passwordCheck,
    inputMode = "text",
    onKeyDown,
    searchInput = false,
    wrapperClassName = ""
  },
  forwardedRef
) {
  // initial use state values
  const [error, setError] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);

  // use effect
  useEffect(() => {
    if (shouldValidate) {
      //when type is email
      if (type === "email") {
        if (value.trim().length > 0 && !isValidEmail(value.trim())) {
          setError("Invalid email address. Please enter a valid email.");
        } else {
          setError("");
        }
      }

      if (type === "website") {
        if (
          value.trim().length > 0 &&
          !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value.trim())
        ) {
          setError("Invalid website name. Please enter a valid domain.");
        } else {
          setError("");
        }
      }

      // when type is password
      if (type === "password") {
        if (value.trim().length > 0 && !isStrongPassword(value.trim())) {
          setError(
            "Passwords do not match the requirements. Please try again."
          );
        } else {
          setError("");
        }
      }

      // check when there is a password and repeat password field
      if (name === "repeatNewPassword") {
        if (
          value.trim().length > 0 &&
          value.trim() !== (document.getElementById("newPassword")! as HTMLInputElement).value
        ) {
          setError("Passwords do not match. Please try again.");
        } else {
          setError("");
        }
      }

      // check when there is an insert current password field
      if (name === "currentPassword") {
        if (
          value.trim().length > 0 && passwordCheck
        ) {
          setError("The password you entered is incorrect");
        } else {
          setError("");
        }
      }

      // when type is name
      if (minLength !== undefined) {
        if (value.trim().length > 0 && value.trim().length < 3) {
          setError(`${label} is too short. Please enter at least 3 characters.`);
        } else {
          setError("");
        }
      }
    }
  }, [minLength, shouldValidate, type, value, name, passwordCheck]);

  useEffect(() => {
    if (shouldValidate) {
      let isValid = !error === true;
      onValidityChange?.(isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldValidate, error]);

  // Building block;

  return (
    <div
      className={clsx("input__container", style, wrapperClassName)}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1
      }}>
      {label && (
        <label htmlFor={name} className={clsx("input__container__label", className.label)}>
          {label}
          {isCompulsory && (
            <span className="!tw-text-[#ff0000] tw-text-xs tw-ml-1">
              {"*"}
            </span>
          )}
        </label>
      )}
      <div className={clsx("input__container__div", className.inputContainer)}>
        <input
          className={clsx("input__container__div__input", error && "border-danger", className.input, searchInput && "!tw-pl-8")}
          type={type === "password" ? (revealPassword ? "text" : "password") : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={forwardedRef}
          disabled={disabled}
          {...inputAttrs}
          inputMode={inputMode}
          onKeyDown={onKeyDown}
        />
        {type === "password" && (
          <img
            onClick={() => setRevealPassword(!revealPassword)}
            src={revealPassword ? eye_icon : eye_hide_icon}
            alt="eye icon"
            className="input__container__div__input__icon"
          />
        )}
        {searchInput && (
          <img
            src={searchInputIcon}
            alt="search icon"
            className="tw-absolute tw-z-10 tw-left-2 tw-top-1/2 tw-translate-y-[-50%] tw-size-5"
            style={{
              transform: "translateY(-50%)"
            }}
          />
        )}
      </div>
      {error && <p className="input__container__div__error !tw-text-xs">{error}</p>}
    </div>
  );
});

export default InputField;
