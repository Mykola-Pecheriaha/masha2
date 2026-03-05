import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  /** when true, container is slightly narrower than the default header container */
  narrow?: boolean
}

export default function Container({
  children,
  className = '',
  narrow = false,
}: ContainerProps) {
  const maxWidthClass = narrow ? 'max-w-6xl' : 'max-w-7xl'
  return (
    <div
      className={`mx-auto w-full ${maxWidthClass} px-6 lg:px-10 ${className}`}
    >
      {children}
    </div>
  )
}
