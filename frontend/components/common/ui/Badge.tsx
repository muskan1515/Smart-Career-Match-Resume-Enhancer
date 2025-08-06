import React from "react"

type BadgeProps = {
  children: React.ReactNode
  variant?: "green" | "red" | "gray" | "blue" | "purple"
}

export function Badge({ children, variant = "gray" }: BadgeProps) {
  const base = "text-xs font-medium px-3 py-1 rounded-full border"
  const colorMap = {
    green: "bg-green-100 text-green-700 border-green-300",
    red: "bg-red-100 text-red-700 border-red-300",
    gray: "bg-gray-100 text-gray-700 border-gray-300",
    blue: "bg-blue-100 text-blue-700 border-blue-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
  }

  return <span className={`${base} ${colorMap[variant]}`}>{children}</span>
}
