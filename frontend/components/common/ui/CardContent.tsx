import React from "react"

type CardContentProps = {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`space-y-6 ${className}`}>{children}</div>
}
