"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      className={`fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-white p-6 focus:outline-none ${className}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4">
        <X className="h-5 w-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mb-4" {...props} />
);
export const DialogTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <DialogPrimitive.Title className="text-lg font-semibold" {...props} />
);
export const DialogClose = DialogPrimitive.Close;
