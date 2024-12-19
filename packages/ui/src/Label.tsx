"use client";

import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return (
    <label className="text-sm font-medium leading-none text-neutral-300 ">
      {children}
    </label>
  );
};

Label.displayName = "Label";

export { Label };
