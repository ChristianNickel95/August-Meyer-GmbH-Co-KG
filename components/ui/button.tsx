import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-white hover:bg-neutral-900 active:bg-neutral-950 focus-visible:ring-neutral-800 shadow-sm hover:shadow-md",
        sustainability: "bg-sustainability-600 text-white hover:bg-sustainability-700 active:bg-sustainability-800 focus-visible:ring-sustainability-600 shadow-sm hover:shadow-md",
        outline: "border-2 border-neutral-400 bg-transparent text-neutral-700 hover:bg-neutral-50 hover:border-neutral-600 active:bg-neutral-100 focus-visible:ring-neutral-400",
        ghost: "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-300",
        link: "text-neutral-700 underline-offset-4 hover:text-neutral-900 hover:underline focus-visible:ring-neutral-300",
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
