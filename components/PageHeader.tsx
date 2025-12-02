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
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {breadcrumb.href ? (
                    <a
                      href={breadcrumb.href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {breadcrumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-900">{breadcrumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <div className={fullWidth ? 'w-full' : 'max-w-3xl'}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && (
            <div className="text-xl text-gray-600 leading-relaxed space-y-4">
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
