import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
      outline:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
      link: "text-blue-600 underline-offset-4 hover:underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    }

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
