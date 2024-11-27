import React from "react";

interface ButtonProps {
  variant: "light" | "dark";
  size: "sm" | "lg" | "md";
  text: "string";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return <button>{props.text}</button>;
};
