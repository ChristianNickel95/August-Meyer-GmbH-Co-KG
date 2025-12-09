import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-[#2F6BA8] text-white hover:bg-[#2F6BA8]/90 active:bg-[#2F6BA8]/80 focus-visible:ring-[#2F6BA8] shadow-sm hover:shadow-md",
        sustainability: "bg-[#4CC17C] text-white hover:bg-[#4CC17C]/90 active:bg-[#4CC17C]/80 focus-visible:ring-[#4CC17C] shadow-sm hover:shadow-md",
        outline: "border-2 border-[#2F6BA8] bg-transparent text-[#E6EDF3] hover:bg-[#2F6BA8]/20 hover:border-[#2F6BA8] active:bg-[#2F6BA8]/30 focus-visible:ring-[#2F6BA8]",
        ghost: "text-[#E6EDF3] hover:bg-[#1B2B3C] active:bg-[#2A3F55] focus-visible:ring-[#2F6BA8]",
        link: "text-[#2F6BA8] underline-offset-4 hover:text-[#4CC17C] hover:underline focus-visible:ring-[#2F6BA8]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-3.5 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
