import React from "react";
import { cn } from "../utils/cn";
import { Label } from "../shadcn-ui/Label";
import { Input } from "../shadcn-ui/Input";

type InputProps = React.ComponentProps<"input"> & {
    label?: string;
};

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return <div className={cn("flex flex-col my-2", className)}>
        <Label>{label}</Label>
        <Input {...props} type={type} />
    </div>
  }
);
