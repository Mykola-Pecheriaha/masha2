"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export type ToastProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export type ToastActionElement = React.ReactElement | null
export function ToastViewport({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex max-w-md flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      title,
      description,
      action,
      open = true,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-start gap-3 rounded-md border border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md",
          "text-sm text-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex-1">
          {title ? (
            <div className="font-medium leading-snug">{title}</div>
          ) : null}
          {description ? (
            <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {description}
            </div>
          ) : null}
        </div>

        {action ? (
          <div className="ml-2 shrink-0">{action}</div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  },
)

Toast.displayName = "Toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastViewport>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastViewport>
  )
}

