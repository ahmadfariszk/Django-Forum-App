import React from "react";
import { cn } from "../utils/cn";
import { Label } from "../shadcn-ui/Label";
import { Textarea } from "../shadcn-ui/Textarea";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
};

export const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, label, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col my-2", className)}>
      <Label>{label}</Label>
      <Textarea {...props} />
    </div>
  );
});
