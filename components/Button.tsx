import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  const baseClasses =
    "px-4 py-2 rounded-full font-medium text-sm transition-colors shadow-sm";

  const enabledClasses =
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 cursor-pointer";

  const disabledClasses =
    "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      {children}
    </button>
  );
};

// 同时提供一个默认导出，避免以后误写成 `import Button from "./Button"` 也会报错
export default Button;
