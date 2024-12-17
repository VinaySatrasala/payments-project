import * as React from "react";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children : React.ReactNode
}

const Button = (
  ({ className, onClick,children }:ButtonProps) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:pointer-events-none bg-white";

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else {
        const userInput = prompt("Enter your input:");
        if (userInput) {
          alert(`You entered: ${userInput}`);
        }
      }
    };

    return (
      <button
        className={`${baseStyles} ${className}`}
        onClick={handleClick}
      >
        {children}
        </button>
    );
  }
);


export { Button };
