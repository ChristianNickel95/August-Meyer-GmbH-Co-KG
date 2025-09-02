'use client';

import { Variant } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface VariantTableProps {
  variants: Variant[];
}

export default function VariantTable({ variants }: VariantTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Variante</TableHead>
            <TableHead>Artikel-Nr.</TableHead>
            <TableHead>VE</TableHead>
            <TableHead>Maße</TableHead>
            <TableHead>Einheit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{variant.name}</TableCell>
              <TableCell className="font-mono text-sm">{variant.sku || '-'}</TableCell>
              <TableCell>{variant.ve || '-'}</TableCell>
              <TableCell>{variant.masse || '-'}</TableCell>
              <TableCell>{variant.einheit || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
