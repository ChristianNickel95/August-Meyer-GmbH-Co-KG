import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
