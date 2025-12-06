import { Product, Category, getAllCategories } from './products';

/**
 * Erweitertes Synonym-Mapping für bessere Suchergebnisse
 */
const synonymMap: Record<string, string[]> = {
  'öl': ['fett', 'öl', 'schmierstoff', 'schmutz'],
  'fett': ['öl', 'fett', 'schmierstoff', 'schmutz'],
  'reinigen': ['säubern', 'putzen', 'wischen', 'reinigen', 'sauber'],
  'sauber': ['rein', 'sauber', 'hygienisch', 'unverschmutzt'],
  'verschmutzung': ['schmutz', 'dreck', 'verschmutzung', 'verunreinigung'],
  'grob': ['stark', 'grob', 'hartnäckig', 'intensiv'],
  'flüssigkeit': ['wasser', 'flüssigkeit', 'nass', 'feucht'],
  'fusselfrei': ['fusselfrei', 'fusselarm', 'ohne fusseln'],
  'schlierenfrei': ['schlierenfrei', 'streifenfrei', 'ohne schlieren'],
  'hygiene': ['hygiene', 'sauberkeit', 'gesundheit', 'reinheit'],
  'maschine': ['gerät', 'maschine', 'anlage', 'apparat'],
  'polieren': ['glänzen', 'polieren', 'glätten', 'versiegeln'],
};

/**
 * Erweitert Suchbegriffe mit Synonymen
 */
function expandQuery(query: string): string[] {
  const terms = query.toLowerCase().split(/\s+/);
  const expanded: string[] = [...terms];
  
  terms.forEach(term => {
    Object.entries(synonymMap).forEach(([key, synonyms]) => {
      if (term.includes(key) || key.includes(term)) {
        expanded.push(...synonyms);
      }
    });
  });
  
  return Array.from(new Set(expanded)); // Entferne Duplikate
}

/**
 * Berechnet einen Relevanz-Score für ein Produkt basierend auf der Suchanfrage
 */
function calculateRelevanceScore(product: Product, queryTerms: string[]): number {
  let score = 0;
  const searchText = createProductSearchText(product).toLowerCase();
  
  queryTerms.forEach(term => {
    // Exakte Matches im Namen geben höchste Punktzahl
    if (product.name.toLowerCase().includes(term)) {
      score += 10;
    }
    // Matches in der kurzen Beschreibung
    if (product.shortDescription?.toLowerCase().includes(term)) {
      score += 5;
    }
    // Matches in der vollständigen Beschreibung
    if (product.description?.toLowerCase().includes(term)) {
      score += 3;
    }
    // Matches in Kategorienamen
    if (product.categoryName?.toLowerCase().includes(term) || 
        product.subcategoryName?.toLowerCase().includes(term)) {
      score += 4;
    }
    // Matches in Benefits
    if (product.benefits?.some(b => b.toLowerCase().includes(term))) {
      score += 3;
    }
    // Matches in Properties
    if (product.properties?.some(p => p.toLowerCase().includes(term))) {
      score += 3;
    }
    // Matches in Use-Cases
    if (product.useCases?.some(uc => {
      const useCaseLabels: Record<string, string> = {
        'oel_fett_entfernen': 'öl fett entfernen',
        'grobe_verschmutzungen': 'grobe verschmutzungen',
        'fusselfrei_reinigen': 'fusselfrei reinigen',
        'polieren': 'polieren',
        'fluessigkeiten_aufnehmen': 'flüssigkeiten aufnehmen',
        'reissfest_nassfest': 'reißfest nassfest',
        'schlierenfrei_reinigen': 'schlierenfrei reinigen',
        'maschinenreinigung': 'maschinenreinigung',
        'haende_hygiene': 'hände hygiene',
      };
      return useCaseLabels[uc]?.includes(term);
    })) {
      score += 4;
    }
    // Artikelnummer Match
    if (product.articleNumber?.toLowerCase().includes(term)) {
      score += 8;
    }
  });
  
  return score;
}

/**
 * Erstellt den Suchtext für ein Produkt (Kombination aus verschiedenen Feldern)
 */
function createProductSearchText(product: Product): string {
  const parts = [
    product.name,
    product.shortDescription,
    product.description,
    product.categoryName,
    product.subcategoryName,
    product.benefits?.join(' '),
    product.properties?.join(' '), // Auch Properties durchsuchen
    product.useCases?.map(uc => {
      const useCaseLabels: Record<string, string> = {
        'oel_fett_entfernen': 'Öl Fett entfernen',
        'grobe_verschmutzungen': 'Grobe Verschmutzungen',
        'fusselfrei_reinigen': 'Fusselfrei reinigen',
        'polieren': 'Polieren',
        'fluessigkeiten_aufnehmen': 'Flüssigkeiten aufnehmen',
        'reissfest_nassfest': 'Reißfest Nassfest',
        'schlierenfrei_reinigen': 'Schlierenfrei reinigen',
        'maschinenreinigung': 'Maschinenreinigung',
        'haende_hygiene': 'Hände Hygiene',
      };
      return useCaseLabels[uc] || uc;
    }).join(' '),
  ].filter(Boolean);
  
  return parts.join(' ');
}

/**
 * Erstellt Suchtext für eine Kategorie (inkl. Unterkategorien)
 */
function createCategorySearchText(category: Category): string {
  const parts = [
    category.name,
    category.description,
    ...(category.subcategories?.map(sub => `${sub.name} ${sub.description}`) || []),
  ].filter(Boolean);
  
  return parts.join(' ');
}

/**
 * Intelligente semantische Suche mit Synonym-Erweiterung und Relevanz-Scoring
 * Durchsucht Produkte, Kategorien und Unterkategorien
 */
export function semanticSearch(
  query: string,
  products: Product[],
  threshold: number = 1
): Product[] {
  if (!query.trim()) {
    return products;
  }

  // Erweitere Suchbegriffe mit Synonymen
  const expandedTerms = expandQuery(query);
  
  // Hole alle Kategorien für Kategorie-Suche
  const categories = getAllCategories();
  
  // Finde relevante Kategorien
  const relevantCategoryIds = new Set<string>();
  categories.forEach(category => {
    const categoryText = createCategorySearchText(category).toLowerCase();
    const hasMatch = expandedTerms.some(term => categoryText.includes(term));
    if (hasMatch) {
      relevantCategoryIds.add(category.id);
      // Füge auch alle Unterkategorien hinzu
      category.subcategories?.forEach(sub => {
        relevantCategoryIds.add(sub.id);
      });
    }
  });
  
  // Berechne Relevanz-Score für jedes Produkt
  const scoredProducts = products
    .map((product) => {
      let score = calculateRelevanceScore(product, expandedTerms);
      
      // Bonus wenn Produkt in relevanter Kategorie ist
      if (relevantCategoryIds.has(product.category)) {
        score += 5;
      }
      if (product.subcategory && relevantCategoryIds.has(product.subcategory)) {
        score += 3;
      }
      
      // Bonus für Properties-Matches
      if (product.properties?.some(prop => {
        return expandedTerms.some(term => prop.toLowerCase().includes(term));
      })) {
        score += 2;
      }
      
      return { product, score };
    })
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);

  return scoredProducts;
}

/**
 * Fallback: Normale Textsuche
 */
function fallbackTextSearch(query: string, products: Product[]): Product[] {
  const queryLower = query.toLowerCase().trim();
  
  return products.filter((product) => {
    const searchText = createProductSearchText(product);
    return searchText.includes(queryLower);
  });
}

/**
 * Kombiniert semantische Suche mit Use-Case-Filter
 */
export async function searchProducts(
  query: string,
  allProducts: Product[],
  selectedUseCases: string[] = []
): Promise<Product[]> {
  let filtered = allProducts;

  // Zuerst nach Use-Cases filtern
  if (selectedUseCases.length > 0) {
    filtered = filtered.filter((product) => {
      return product.useCases?.some((uc) => selectedUseCases.includes(uc));
    });
  }

  // Dann semantische Suche
  if (query.trim()) {
    try {
      filtered = semanticSearch(query, filtered);
    } catch (error) {
      console.warn('Semantische Suche fehlgeschlagen, verwende Textsuche:', error);
      filtered = fallbackTextSearch(query, filtered);
    }
  }

  return filtered;
}
