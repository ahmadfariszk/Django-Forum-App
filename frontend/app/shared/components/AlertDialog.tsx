import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { Button } from "../shadcn-ui/Button";

type AlertDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  text?: string;
  submitButtonText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const AlertDialog = ({
  isOpen,
  setIsOpen,
  title,
  text,
  description,
  submitButtonText,
  onSubmit,
  onCancel,
}: AlertDialogProps) => {
  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  const handleSubmit = () => {
    onSubmit?.();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
    //   className="relative z-50"
      transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg border bg-white p-12 rounded">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description className="text-sm text-zinc-500">{description}</Description>
          <p className="my-4">{text}</p>
          <div className="flex justify-end gap-4">
            <Button variant={'outline'} onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>{submitButtonText}</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
