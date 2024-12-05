import React from "react";
import { Button, ButtonProps } from "../shadcn-ui/Button";
import { cn } from "../utils/cn";

type IconButtonProps = {
  icon?: React.ReactNode;
  label?: string;
} & ButtonProps;

const IconButton = ({
  icon,
  label,
  size,
  variant = "icondark",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      size={size}
      variant={variant}
      className={cn("mx-2 flex items-center justify-center", {
        "p-2": !label,
      }, className)}
    >
      {icon && icon}
      {label && label}
    </Button>
  );
};

export default IconButton;
