import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-sm border border-white/8 bg-[#13294b] px-3 py-2 text-sm text-white ring-offset-[#0b1a33] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#c7d2e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffb3] focus-visible:ring-offset-2 focus-visible:border-[#00ffb3] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
