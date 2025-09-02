import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  size?: 'default' | 'tight' | 'wide';
}

export default function Section({ 
  children, 
  className, 
  as: Component = "section",
  id,
  size = 'default'
}: SectionProps) {
  const sizeClasses = {
    default: 'section',
    tight: 'section-tight',
    wide: 'section-wide'
  };

  return (
    <Component 
      id={id}
      className={cn(sizeClasses[size], className)}
    >
      {children}
    </Component>
  );
}
