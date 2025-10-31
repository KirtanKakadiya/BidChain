import React, { JSX } from "react";
import "./button.css";

export interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
  ariaLabel?: string;
}

export function PrimaryButton({ text, icon, onClick, ariaLabel }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? text}
      className="primary-button"
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{text}</span>
    </button>
  );
}
