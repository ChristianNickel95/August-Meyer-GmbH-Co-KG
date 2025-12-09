interface PageHeaderProps {
  title: string;
  description?: string;
  fullWidth?: boolean;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function PageHeader({ title, description, fullWidth = false, breadcrumbs }: PageHeaderProps): JSX.Element {
  return (
    <div className="w-full bg-[#0D1C2E] border-b border-[#2A3F55]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-neutral-400">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {breadcrumb.href ? (
                    <a
                      href={breadcrumb.href}
                      className="hover:text-[#6FE0FF] transition-colors"
                    >
                      {breadcrumb.label}
                    </a>
                  ) : (
                    <span className="text-neutral-300">{breadcrumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <div className={fullWidth ? 'w-full' : 'max-w-3xl'}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
          {description && (
            <div className="text-base md:text-lg text-neutral-300 leading-relaxed space-y-4">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
