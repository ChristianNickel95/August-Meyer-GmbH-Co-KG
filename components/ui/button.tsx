import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-ring shadow-sm hover:shadow-[0_0_8px_rgba(0,230,168,0.3)] dark:hover:shadow-[0_0_8px_rgba(0,255,179,0.4)] rounded-[2px] dark:rounded-sm",
        sustainability: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-ring shadow-sm hover:shadow-[0_0_8px_rgba(0,230,168,0.3)] dark:hover:shadow-[0_0_8px_rgba(0,255,179,0.4)] rounded-[2px] dark:rounded-sm bg-gradient-to-r from-[#00E6A8] to-[#7CFFDD] dark:from-[#00ffb3] dark:to-[#00ffb3]",
        outline: "border border-border bg-transparent text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground active:bg-primary/90 focus-visible:ring-ring transition-all duration-150 rounded-[2px] dark:rounded-sm",
        ghost: "text-foreground hover:bg-muted active:bg-muted/80 focus-visible:ring-ring rounded-[2px] dark:rounded-sm",
        link: "text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:ring-ring",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base rounded-[2px] dark:rounded-sm",
        sm: "h-9 px-4 py-2 text-sm rounded-[2px] dark:rounded-sm",
        lg: "h-14 px-8 py-3.5 text-lg rounded-[2px] dark:rounded-sm",
        icon: "h-11 w-11 rounded-[2px] dark:rounded-sm",
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
