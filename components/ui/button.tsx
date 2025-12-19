import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#00ffb3] text-black hover:bg-[#00ffb3]/90 active:bg-[#00ffb3]/80 focus-visible:ring-[#00ffb3] shadow-sm hover:shadow-[0_0_8px_rgba(0,255,179,0.4)]",
        sustainability: "bg-[#00ffb3] text-black hover:bg-[#00ffb3]/90 active:bg-[#00ffb3]/80 focus-visible:ring-[#00ffb3] shadow-sm hover:shadow-[0_0_8px_rgba(0,255,179,0.4)]",
        outline: "border border-white/8 bg-transparent text-white hover:bg-[#00ffb3] hover:border-[#00ffb3] hover:text-black active:bg-[#00ffb3]/90 focus-visible:ring-[#00ffb3] transition-all duration-150",
        ghost: "text-white hover:bg-white/8 active:bg-white/12 focus-visible:ring-[#00ffb3]",
        link: "text-white underline-offset-4 hover:text-[#00ffb3] hover:underline focus-visible:ring-[#00ffb3]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base rounded-sm",
        sm: "h-9 px-4 py-2 text-sm rounded-sm",
        lg: "h-14 px-8 py-3.5 text-lg rounded-sm",
        icon: "h-11 w-11 rounded-sm",
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
