import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ className = "", onchange, ...props }) => {
  return (
    <input
      {...props}
      className={`flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onChange={onchange}
    />
  );
};

Input.displayName = "Input";

export { Input };
