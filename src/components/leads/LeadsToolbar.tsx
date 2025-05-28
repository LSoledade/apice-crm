import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  SlidersHorizontal,
  List,
  Kanban,
  RefreshCw,
  Download,
  MoreHorizontal
} from 'lucide-react';

interface LeadsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'list' | 'kanban';
  onViewModeChange: (mode: 'list' | 'kanban') => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  totalLeads?: number;
}

export const LeadsToolbar: React.FC<LeadsToolbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedStatus,
  onStatusChange,
  onRefresh,
  isRefreshing = false,
  totalLeads = 0
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border-0 shadow-lg space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar por nome, email, empresa..." 
              className="pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-10 border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">
                <div className="flex items-center justify-between w-full">
                  <span>Todos os Status</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {totalLeads}
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="novo">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Novos
                </div>
              </SelectItem>
              <SelectItem value="contato">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Em Contato
                </div>
              </SelectItem>
              <SelectItem value="qualificado">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Qualificados
                </div>
              </SelectItem>
              <SelectItem value="proposta">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Propostas
                </div>
              </SelectItem>
              <SelectItem value="ganho">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Ganhos
                </div>
              </SelectItem>
              <SelectItem value="perdido">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Perdidos
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button variant="outline" size="sm" className="h-10">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <div className="h-8 w-px bg-gray-200 mx-2" />
          
          {/* View Mode Toggles */}
          <div className="flex rounded-md border border-gray-200 p-1 bg-gray-50">
            <Button 
              variant={viewMode === 'list' ? "default" : "ghost"} 
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="h-8 px-3"
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
            <Button 
              variant={viewMode === 'kanban' ? "default" : "ghost"} 
              size="sm"
              onClick={() => onViewModeChange('kanban')}
              className="h-8 px-3"
            >
              <Kanban className="h-4 w-4 mr-1" />
              Kanban
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>
            {totalLeads === 1 
              ? `${totalLeads} lead encontrado` 
              : `${totalLeads} leads encontrados`
            }
          </span>
          
          {(searchQuery || selectedStatus !== 'todos') && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Filtros ativos</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Busca: "{searchQuery}"
                </Badge>
              )}
              {selectedStatus !== 'todos' && (
                <Badge variant="secondary" className="text-xs">
                  Status: {selectedStatus}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="text-gray-400">
          Última atualização: agora
        </div>
      </div>
    </div>
  );
};
