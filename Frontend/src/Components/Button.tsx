import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "lg" | "md";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const sizeStyles = {
  sm: "py-1 px-2 text-sm",
  md: "py-1.5 px-3 text-md",
  lg: "py-3 px-4 text-xl",
};
const defaultStyles = "rounded-md flex items-center";

const varientStyles = {
  primary: "bg-purple-300 text-purple-600",
  secondary: "bg-purple-500 text-purple-300",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varientStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {props.startIcon ? <div className="pr-2 ">{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon}
    </button>
  );
};
