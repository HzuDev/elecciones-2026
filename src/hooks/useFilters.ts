import { useState, useMemo, useCallback } from 'react';

interface UseFiltersOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  initialFilters?: Record<string, any>;
}

export function useFilters<T extends Record<string, any>>({
  data,
  searchFields,
  initialFilters = {},
}: UseFiltersOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const filteredData = useMemo(() => {
    let result = data;

    // Aplicar búsqueda por texto
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(lowerSearch);
        })
      );
    }

    // Aplicar filtros específicos
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Filtros especiales con sufijos
        if (key.endsWith('Prefix')) {
          // Filtro por prefijo de string
          const fieldName = key.replace('Prefix', '');
          result = result.filter((item) => {
            const fieldValue = String(item[fieldName] || '');
            return fieldValue.startsWith(value);
          });
        } else if (Array.isArray(value)) {
          // Filtro por múltiples valores
          if (value.length > 0) {
            result = result.filter((item) => value.includes(item[key]));
          }
        } else {
          // Filtro por un solo valor
          result = result.filter((item) => item[key] === value);
        }
      }
    });

    return result;
  }, [data, searchTerm, filters, searchFields]);

  const setFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
  };
}
