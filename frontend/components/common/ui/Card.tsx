import React from "react"

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto ${className}`}>
      {children}
    </div>
  )
}
