import React, { useState } from 'react';
import { FilterOptions } from '@/hooks/use-finance-filters';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { 
  Filter, 
  CalendarIcon, 
  X, 
  Check, 
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Wallet
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FinanceFiltersProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalFiltered?: boolean;
  totalResults?: number;
  categorias: string[];
  contas: string[];
}

export function FinanceFilters({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalFiltered = false,
  totalResults = 0,
  categorias,
  contas
}: FinanceFiltersProps) {
  const [open, setOpen] = useState(false);
  const [valorRange, setValorRange] = useState<[number, number]>([0, 100000]);
  
  // Valores máximos e mínimos para o slider de valor
  const MIN_VALOR = 0;
  const MAX_VALOR = 100000;
  
  // Estados temporários para os filtros
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);
  
  // Função para aplicar todos os filtros
  const applyFilters = () => {
    onUpdateFilters({
      ...tempFilters,
      valorMin: valorRange[0] > MIN_VALOR ? valorRange[0] : undefined,
      valorMax: valorRange[1] < MAX_VALOR ? valorRange[1] : undefined,
    });
    setOpen(false);
  };
  
  // Função para resetar filtros temporários
  const resetTempFilters = () => {
    setTempFilters({
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
    });
    setValorRange([MIN_VALOR, MAX_VALOR]);
  };
  
  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      filters.startDate !== null || 
      filters.endDate !== null || 
      filters.status !== 'todos' || 
      filters.categoria !== 'todos' || 
      filters.tipo !== 'todos' || 
      filters.valorMin !== undefined || 
      filters.valorMax !== undefined || 
      filters.conta !== 'todos' || 
      filters.recorrente !== undefined ||
      (filters.search && filters.search.trim() !== '')
    );
  };
  
  // Badge para mostrar total de filtros
  const FilterBadge = () => {
    if (!totalFiltered) return null;
    return (
      <Badge variant="outline" className="ml-2">
        {totalResults} resultados
      </Badge>
    );
  };
  
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            className="pl-9 w-[250px]"
            placeholder="Buscar..."
            value={filters.search || ''}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          {filters.search && (
            <X
              className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => onUpdateFilters({ search: '' })}
            />
          )}
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant={hasActiveFilters() ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros Avançados
              {hasActiveFilters() && <FilterBadge />}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Filtros Avançados</DialogTitle>
              <DialogDescription>
                Filtre os dados financeiros por diversos critérios
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {/* Filtro de Período */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Período</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startDate" className="text-xs">Data Inicial</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !tempFilters.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tempFilters.startDate ? (
                            format(tempFilters.startDate, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={tempFilters.startDate || undefined}
                          onSelect={(date) => setTempFilters(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-xs">Data Final</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !tempFilters.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tempFilters.endDate ? (
                            format(tempFilters.endDate, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecionar</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={tempFilters.endDate || undefined}
                          onSelect={(date) => setTempFilters(prev => ({ ...prev, endDate: date }))}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              {/* Filtro de Tipo */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Tipo de Transação</h3>
                <div className="flex gap-2">
                  <Button
                    variant={tempFilters.tipo === 'todos' ? 'default' : 'outline'}
                    className="flex-1 justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, tipo: 'todos' }))}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Todos
                  </Button>
                  <Button
                    variant={tempFilters.tipo === 'entrada' ? 'default' : 'outline'}
                    className="flex-1 justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, tipo: 'entrada' }))}
                  >
                    <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
                    Entradas
                  </Button>
                  <Button
                    variant={tempFilters.tipo === 'saida' ? 'default' : 'outline'}
                    className="flex-1 justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, tipo: 'saida' }))}
                  >
                    <ArrowDownCircle className="mr-2 h-4 w-4 text-red-500" />
                    Saídas
                  </Button>
                </div>
              </div>
              
              {/* Filtro de Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={tempFilters.status === 'todos' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, status: 'todos' }))}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Todos
                  </Button>
                  <Button
                    variant={tempFilters.status === 'pendente' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, status: 'pendente' }))}
                  >
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    Pendentes
                  </Button>
                  <Button
                    variant={tempFilters.status === 'concluido' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, status: 'concluido' }))}
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Concluídos
                  </Button>
                  <Button
                    variant={tempFilters.status === 'atrasado' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => setTempFilters(prev => ({ ...prev, status: 'atrasado' }))}
                  >
                    <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                    Atrasados
                  </Button>
                </div>
              </div>
              
              {/* Filtro de Valor */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Valor</h3>
                  <span className="text-xs text-gray-500">
                    {`R$ ${valorRange[0].toLocaleString('pt-BR')} - R$ ${valorRange[1].toLocaleString('pt-BR')}`}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 100000]}
                  min={0}
                  max={100000}
                  step={1000}
                  value={valorRange}
                  onValueChange={(value) => setValorRange(value as [number, number])}
                  className="mt-6"
                />
              </div>
              
              {/* Filtro de Categoria */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Categoria</h3>
                <Select
                  value={tempFilters.categoria as string}
                  onValueChange={(value) => setTempFilters(prev => ({ ...prev, categoria: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as categorias</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtro de Conta */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Conta</h3>
                <Select
                  value={tempFilters.conta as string}
                  onValueChange={(value) => setTempFilters(prev => ({ ...prev, conta: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as contas</SelectItem>
                    {contas.map((conta) => (
                      <SelectItem key={conta} value={conta}>{conta}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtro de Recorrência */}
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="recorrente"
                  checked={tempFilters.recorrente === true}
                  onCheckedChange={(checked) => {
                    if (checked === 'indeterminate') return;
                    setTempFilters(prev => ({ 
                      ...prev, 
                      recorrente: checked ? true : undefined 
                    }));
                  }}
                />
                <Label htmlFor="recorrente">Apenas recorrentes</Label>
              </div>
              
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="ghost" onClick={resetTempFilters} type="button">
                <X className="mr-2 h-4 w-4" />
                Limpar
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)} type="button">
                  Cancelar
                </Button>
                <Button onClick={applyFilters} type="button">
                  <Check className="mr-2 h-4 w-4" />
                  Aplicar Filtros
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {hasActiveFilters() && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="h-9">
            <X className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        )}
      </div>
      
      {/* Chips de filtros ativos */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.startDate && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Início: {format(filters.startDate, "dd/MM/yyyy", { locale: ptBR })}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ startDate: null })}
              />
            </Badge>
          )}
          
          {filters.endDate && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Fim: {format(filters.endDate, "dd/MM/yyyy", { locale: ptBR })}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ endDate: null })}
              />
            </Badge>
          )}
          
          {filters.tipo && filters.tipo !== 'todos' && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Tipo: {filters.tipo === 'entrada' ? 'Entradas' : 'Saídas'}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ tipo: 'todos' })}
              />
            </Badge>
          )}
          
          {filters.status && filters.status !== 'todos' && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Status: {
                filters.status === 'concluido' ? 'Concluídos' : 
                filters.status === 'pendente' ? 'Pendentes' : 
                filters.status === 'atrasado' ? 'Atrasados' : filters.status
              }</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ status: 'todos' })}
              />
            </Badge>
          )}
          
          {filters.categoria && filters.categoria !== 'todos' && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Categoria: {filters.categoria}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ categoria: 'todos' })}
              />
            </Badge>
          )}
          
          {filters.conta && filters.conta !== 'todos' && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Conta: {filters.conta}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ conta: 'todos' })}
              />
            </Badge>
          )}
          
          {filters.valorMin !== undefined && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Valor mín: R$ {filters.valorMin.toLocaleString('pt-BR')}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ valorMin: undefined })}
              />
            </Badge>
          )}
          
          {filters.valorMax !== undefined && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Valor máx: R$ {filters.valorMax.toLocaleString('pt-BR')}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ valorMax: undefined })}
              />
            </Badge>
          )}
          
          {filters.recorrente !== undefined && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              <span>Apenas recorrentes</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onUpdateFilters({ recorrente: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
