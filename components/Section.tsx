import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps): JSX.Element {
  return (
    <section id={id} className={cn('section-padding', className)}>
      {children}
    </section>
  );
}
