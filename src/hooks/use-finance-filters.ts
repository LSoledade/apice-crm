import { useState, useCallback, useMemo } from 'react';

export interface FilterOptions {
  startDate?: Date | null;
  endDate?: Date | null;
  status?: string | string[];
  categoria?: string | string[];
  tipo?: string;
  valorMin?: number;
  valorMax?: number;
  conta?: string | string[];
  search?: string;
  recorrente?: boolean;
}

export const defaultFilterOptions: FilterOptions = {
  startDate: null,
  endDate: null,
  status: 'todos',
  categoria: 'todos',
  tipo: 'todos',
  valorMin: undefined,
  valorMax: undefined,
  conta: 'todos',
  search: '',
  recorrente: undefined
};

export function useFinanceFilters<T extends Record<string, any>>(
  data: T[], 
  initialFilters: FilterOptions = defaultFilterOptions
) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  // Função para alterar filtros
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);
  
  // Função para resetar filtros
  const resetFilters = useCallback(() => {
    setFilters(defaultFilterOptions);
  }, []);
  
  // Função para filtrar dados
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Filtro de texto de busca
      if (filters.search && filters.search.trim() !== '') {
        const searchTerms = filters.search.toLowerCase().split(' ');
        const searchableText = Object.values(item)
          .filter(val => typeof val === 'string')
          .join(' ')
          .toLowerCase();
          
        const matchesSearch = searchTerms.every(term => searchableText.includes(term));
        
        if (!matchesSearch) return false;
      }
      
      // Filtro de datas
      if (filters.startDate && 'data' in item) {
        const itemDate = item.data instanceof Date 
          ? item.data
          : new Date(item.data);
          
        if (itemDate < filters.startDate) return false;
      }
      
      if (filters.endDate && 'data' in item) {
        const itemDate = item.data instanceof Date 
          ? item.data
          : new Date(item.data);
        
        if (itemDate > filters.endDate) return false;
      }
      
      // Filtro de status
      if (filters.status && filters.status !== 'todos' && 'status' in item) {
        if (Array.isArray(filters.status)) {
          if (!filters.status.includes(item.status as string)) return false;
        } else if (item.status !== filters.status) {
          return false;
        }
      }
      
      // Filtro de categoria
      if (filters.categoria && filters.categoria !== 'todos' && 'categoria' in item) {
        if (Array.isArray(filters.categoria)) {
          if (!filters.categoria.includes(item.categoria as string)) return false;
        } else if (item.categoria !== filters.categoria) {
          return false;
        }
      }
      
      // Filtro de tipo (entrada/saída)
      if (filters.tipo && filters.tipo !== 'todos' && 'tipo' in item) {
        if (item.tipo !== filters.tipo) return false;
      }
      
      // Filtro de valor
      if (filters.valorMin !== undefined && 'valor' in item) {
        if (item.valor < filters.valorMin) return false;
      }
      
      if (filters.valorMax !== undefined && 'valor' in item) {
        if (item.valor > filters.valorMax) return false;
      }
      
      // Filtro de conta
      if (filters.conta && filters.conta !== 'todos' && 'conta' in item) {
        if (Array.isArray(filters.conta)) {
          if (!filters.conta.includes(item.conta as string)) return false;
        } else if (item.conta !== filters.conta) {
          return false;
        }
      }
      
      // Filtro de recorrência
      if (filters.recorrente !== undefined && 'recorrente' in item) {
        if (item.recorrente !== filters.recorrente) return false;
      }
      
      return true;
    });
  }, [data, filters]);
  
  return {
    filters,
    updateFilters,
    resetFilters,
    filteredData,
    totalResults: filteredData.length,
    totalFiltered: filteredData.length !== data.length
  };
}
