//import relevant styles
import "./Button.scss";

// Widget Component
export const Button = ({ buttonActive, type, children, onClick }) => {
  return (
    <button
      className={`mentalyc-modal-button ${
        buttonActive ? "active-modal-btn" : "inactive-modal-btn"
      }`}
      disabled={!buttonActive}
      type={type}
      style={{
        cursor: buttonActive ? "pointer" : "not-allowed"
      }}
      onClick={type === "button" ? onClick : undefined}
    >
      {children}
    </button>
  );
};
