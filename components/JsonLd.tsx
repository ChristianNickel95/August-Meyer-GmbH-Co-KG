interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
