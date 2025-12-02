import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductVariant } from '@/lib/products';

interface VariantTableProps {
  variants: ProductVariant[];
}

export function VariantTable({ variants }: VariantTableProps): JSX.Element {
  // Prüfe, ob Varianten Spezifikationen haben
  const hasSpecifications = variants.some(v => v.specifications && Object.keys(v.specifications).length > 0);
  
  // Sammle alle möglichen Spezifikationsschlüssel
  const allSpecKeys = new Set<string>();
  variants.forEach(v => {
    if (v.specifications) {
      Object.keys(v.specifications).forEach(key => allSpecKeys.add(key));
    }
  });
  const specKeys = Array.from(allSpecKeys);

  // Wenn keine Spezifikationen vorhanden, zeige einfache Tabelle
  if (!hasSpecifications && specKeys.length === 0) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bezeichnung</TableHead>
              <TableHead>Artikel-Nr.</TableHead>
              {variants.some(v => v.description) && <TableHead>Beschreibung</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell className="font-medium">{variant.name}</TableCell>
                <TableCell className="font-mono text-sm">{variant.articleNumber}</TableCell>
                {variants.some(v => v.description) && (
                  <TableCell className="text-neutral-600">{variant.description || '-'}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Tabelle mit Spezifikationen
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bezeichnung</TableHead>
            <TableHead>Artikel-Nr.</TableHead>
            {specKeys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
            {variants.some(v => v.description) && <TableHead>Beschreibung</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="font-medium">{variant.name}</TableCell>
              <TableCell className="font-mono text-sm">{variant.articleNumber}</TableCell>
              {specKeys.map((key) => (
                <TableCell key={key} className="text-neutral-600">
                  {variant.specifications?.[key] || '-'}
                </TableCell>
              ))}
              {variants.some(v => v.description) && (
                <TableCell className="text-neutral-600">{variant.description || '-'}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
