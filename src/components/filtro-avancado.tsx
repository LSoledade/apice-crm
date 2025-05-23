import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './ui/badge';
import { pt } from 'date-fns/locale';

interface FiltroAvancadoProps {
  // Tipos de filtros disponíveis
  tiposFiltro: {
    status?: boolean;
    dataInicio?: boolean;
    dataFim?: boolean;
    valor?: boolean;
    categoria?: boolean;
    metodo?: boolean;
    cliente?: boolean;
    recorrente?: boolean;
  };
  // Valores possíveis para os filtros
  opcoesStatus?: string[];
  opcoesCategorias?: string[];
  opcoesMetodos?: string[];
  // Callback para quando os filtros forem aplicados
  onFiltrar: (filtros: any) => void;
}

const FiltroAvancado: React.FC<FiltroAvancadoProps> = ({
  tiposFiltro,
  opcoesStatus = ['pendente', 'pago', 'atrasado', 'cancelado'],
  opcoesCategorias = ['Serviços', 'Produtos', 'Licenças', 'Suporte', 'Consultoria'],
  opcoesMetodos = ['Boleto', 'PIX', 'Cartão de Crédito', 'Transferência Bancária', 'Dinheiro'],
  onFiltrar
}) => {
  const [open, setOpen] = useState(false);
  const [filtrosAtivos, setFiltrosAtivos] = useState<string[]>([]);
  
  // Estados para os filtros
  const [status, setStatus] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [valorMin, setValorMin] = useState<number>(0);
  const [valorMax, setValorMax] = useState<number>(10000);
  const [categoria, setCategoria] = useState<string>('');
  const [metodo, setMetodo] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [recorrente, setRecorrente] = useState<boolean | null>(null);
  
  const aplicarFiltros = () => {
    const filtros = {
      ...(status && { status }),
      ...(dataInicio && { dataInicio }),
      ...(dataFim && { dataFim }),
      ...(valorMin > 0 && { valorMin }),
      ...(valorMax < 10000 && { valorMax }),
      ...(categoria && { categoria }),
      ...(metodo && { metodo }),
      ...(cliente && { cliente }),
      ...(recorrente !== null && { recorrente })
    };
    
    // Atualizar lista de filtros ativos
    const novosFiltrosAtivos: string[] = [];
    if (status) novosFiltrosAtivos.push(`Status: ${status}`);
    if (dataInicio) novosFiltrosAtivos.push(`Data Início: ${format(dataInicio, 'dd/MM/yyyy')}`);
    if (dataFim) novosFiltrosAtivos.push(`Data Fim: ${format(dataFim, 'dd/MM/yyyy')}`);
    if (valorMin > 0 || valorMax < 10000) novosFiltrosAtivos.push(`Valor: ${valorMin.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} - ${valorMax.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`);
    if (categoria) novosFiltrosAtivos.push(`Categoria: ${categoria}`);
    if (metodo) novosFiltrosAtivos.push(`Método: ${metodo}`);
    if (cliente) novosFiltrosAtivos.push(`Cliente: ${cliente}`);
    if (recorrente !== null) novosFiltrosAtivos.push(`Recorrente: ${recorrente ? 'Sim' : 'Não'}`);
    
    setFiltrosAtivos(novosFiltrosAtivos);
    setOpen(false);
    onFiltrar(filtros);
  };
  
  const limparFiltros = () => {
    setStatus('');
    setDataInicio(undefined);
    setDataFim(undefined);
    setValorMin(0);
    setValorMax(10000);
    setCategoria('');
    setMetodo('');
    setCliente('');
    setRecorrente(null);
    setFiltrosAtivos([]);
    onFiltrar({});
  };
  
  const removerFiltro = (filtro: string) => {
    // Extrair o tipo e o valor do filtro
    const [tipo] = filtro.split(':');
    const tipoNormalizado = tipo.trim().toLowerCase();
    
    // Resetar o filtro específico
    if (tipoNormalizado === 'status') setStatus('');
    else if (tipoNormalizado === 'data início') setDataInicio(undefined);
    else if (tipoNormalizado === 'data fim') setDataFim(undefined);
    else if (tipoNormalizado === 'valor') { setValorMin(0); setValorMax(10000); }
    else if (tipoNormalizado === 'categoria') setCategoria('');
    else if (tipoNormalizado === 'método' || tipoNormalizado === 'metodo') setMetodo('');
    else if (tipoNormalizado === 'cliente') setCliente('');
    else if (tipoNormalizado === 'recorrente') setRecorrente(null);
    
    // Atualizar filtros ativos
    setFiltrosAtivos(current => current.filter(f => f !== filtro));
    
    // Recriar objeto de filtros e chamar onFiltrar
    const filtros = {
      ...(status && tipoNormalizado !== 'status' && { status }),
      ...(dataInicio && tipoNormalizado !== 'data início' && { dataInicio }),
      ...(dataFim && tipoNormalizado !== 'data fim' && { dataFim }),
      ...((valorMin > 0 || valorMax < 10000) && tipoNormalizado !== 'valor' && { valorMin, valorMax }),
      ...(categoria && tipoNormalizado !== 'categoria' && { categoria }),
      ...(metodo && tipoNormalizado !== 'método' && { metodo }),
      ...(cliente && tipoNormalizado !== 'cliente' && { cliente }),
      ...(recorrente !== null && tipoNormalizado !== 'recorrente' && { recorrente })
    };
    
    onFiltrar(filtros);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros Avançados
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Filtros Avançados</DialogTitle>
              <DialogDescription>
                Configure filtros específicos para refinar sua busca.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {tiposFiltro.status && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Qualquer status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer status</SelectItem>
                      {opcoesStatus.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {tiposFiltro.categoria && (
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Qualquer categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer categoria</SelectItem>
                      {opcoesCategorias.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {tiposFiltro.metodo && (
                <div className="space-y-2">
                  <Label htmlFor="metodo">Método de Pagamento</Label>
                  <Select value={metodo} onValueChange={setMetodo}>
                    <SelectTrigger id="metodo">
                      <SelectValue placeholder="Qualquer método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer método</SelectItem>
                      {opcoesMetodos.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {tiposFiltro.cliente && (
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    placeholder="Nome do cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                  />
                </div>
              )}
              
              {tiposFiltro.dataInicio && (
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataInicio ? (
                          format(dataInicio, 'dd/MM/yyyy')
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataInicio}
                        onSelect={setDataInicio}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {tiposFiltro.dataFim && (
                <div className="space-y-2">
                  <Label>Data de Fim</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataFim ? (
                          format(dataFim, 'dd/MM/yyyy')
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataFim}
                        onSelect={setDataFim}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {tiposFiltro.valor && (
                <div className="space-y-4 col-span-1 md:col-span-2">
                  <div className="flex justify-between">
                    <Label>Faixa de Valor</Label>
                    <span className="text-sm text-gray-500">
                      {valorMin.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} - 
                      {valorMax.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[valorMin, valorMax]}
                    min={0}
                    max={10000}
                    step={100}
                    onValueChange={([min, max]) => {
                      setValorMin(min);
                      setValorMax(max);
                    }}
                    className="my-6"
                  />
                </div>
              )}
              
              {tiposFiltro.recorrente && (
                <div className="flex items-center justify-between space-x-2 col-span-1 md:col-span-2">
                  <Label htmlFor="recorrente">Apenas Recorrentes</Label>
                  <div className="flex gap-4">
                    <Button 
                      variant={recorrente === true ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setRecorrente(true)}
                    >
                      Sim
                    </Button>
                    <Button 
                      variant={recorrente === false ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setRecorrente(false)}
                    >
                      Não
                    </Button>
                    <Button 
                      variant={recorrente === null ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setRecorrente(null)}
                    >
                      Todos
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={limparFiltros}>
                Limpar Filtros
              </Button>
              <Button onClick={aplicarFiltros}>
                Aplicar Filtros
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Filtros Ativos */}
        {filtrosAtivos.map((filtro) => (
          <Badge key={filtro} variant="outline" className="px-3 py-1 gap-2">
            {filtro}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removerFiltro(filtro)} 
            />
          </Badge>
        ))}
        
        {filtrosAtivos.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={limparFiltros}
            className="text-sm text-gray-500 gap-1"
          >
            <X className="h-3 w-3" /> Limpar
          </Button>
        )}
      </div>
    </div>
  );
};

export default FiltroAvancado;
