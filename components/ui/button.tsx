"use client"

import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "primary" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900",
      ghost: "hover:bg-gray-100 text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-purple-600 text-white hover:bg-purple-700"
    }

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
      icon: "h-10 w-10"
    }

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button } 