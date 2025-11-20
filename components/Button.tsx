import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-2 text-sm font-medium shadow-sm
      transition focus:outline-none focus:ring-2 focus:ring-offset-2
      ${
        disabled
          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer focus:ring-blue-500 focus:ring-offset-slate-900"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
