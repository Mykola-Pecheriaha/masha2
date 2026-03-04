import * as React from 'react'

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type ToastContextValue = {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => string
  remove: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined,
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const push = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id =
      typeof crypto !== 'undefined' && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : Date.now().toString()

    setToasts((prev) => [...prev, { ...toast, id }])
    return id
  }, [])

  const remove = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = React.useMemo(
    () => ({ toasts, push, remove }),
    [toasts, push, remove],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    // Provide a helpful runtime error if the provider is missing
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

export default useToast
