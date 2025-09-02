import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: 'default' | 'tight' | 'wide';
}

export default function Container({ 
  children, 
  className, 
  as: Component = "div",
  size = 'default'
}: ContainerProps) {
  const sizeClasses = {
    default: 'container',
    tight: 'container-tight',
    wide: 'container-wide'
  };

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
}
