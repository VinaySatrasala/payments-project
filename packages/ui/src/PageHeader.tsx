import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return <h1 className="text-3xl font-bold text-white mt-3 text-center">{title}</h1>;
};
