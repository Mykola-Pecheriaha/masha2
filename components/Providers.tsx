'use client'

import { ReactNode } from 'react'
import { ToastProvider } from './ui/use-toast'
import { Toaster } from './ui/toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  )
}
