import React, { useState, useMemo } from 'react';
import { LeadsHeader } from '@/components/leads/LeadsHeader';
import { LeadsToolbar } from '@/components/leads/LeadsToolbar';
import { LeadsList } from '@/components/leads/LeadsList';
import { LeadsKanban } from '@/components/leads/LeadsKanban';
import { SelectedLeadsActions } from '@/components/leads/SelectedLeadsActions';
import { LeadDetailsDialog } from '@/components/leads/LeadDetailsDialog';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLeads } from '@/hooks/useLeads';
import { useLeadSelection, Lead } from '@/hooks/useLeadSelection';
import { filterLeads, groupLeadsByStatus, getStatusColor, getStatusText } from '@/utils/leadUtils';
import { AlertTriangle, Users, TrendingUp, Target, DollarSign, Calendar, RefreshCw } from 'lucide-react';

type StatusFilter = 'todos' | 'novo' | 'contato' | 'qualificado' | 'proposta' | 'ganho' | 'perdido';

const Leads = () => {
  const { 
    leads, 
    loading, 
    error, 
    addLead, 
    updateLead, 
    deleteLead, 
    deleteMultipleLeads,
    updateMultipleLeadsStatus,
    loadLeads
  } = useLeads();
  
  const { 
    selectedLeads, 
    toggleLeadSelection, 
    selectAllLeads, 
    clearSelection 
  } = useLeadSelection();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('todos');
  const [showBulkStatusDialog, setShowBulkStatusDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filter leads based on search and status
  const filteredLeads = useMemo(() => 
    filterLeads(leads, searchQuery, selectedStatus), 
    [leads, searchQuery, selectedStatus]
  );
  
  // Group leads by status for kanban view
  const leadsByStatus = useMemo(() => 
    groupLeadsByStatus(filteredLeads), 
    [filteredLeads]
  );

  // Calculate stats
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
    const wonLeads = leads.filter(lead => lead.status === 'ganho').length;
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthLeads = leads.filter(lead => {
      const leadDate = new Date(lead.date);
      return leadDate.getMonth() === thisMonth && leadDate.getFullYear() === thisYear;
    }).length;

    return {
      totalLeads,
      totalValue,
      conversionRate,
      thisMonthLeads
    };
  }, [leads]);  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadLeads();
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddLead = async (leadData: Omit<Lead, 'id'>) => {
    try {
      await addLead(leadData);
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
    }
  };

  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      await updateLead(id, updates);
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await deleteMultipleLeads(selectedLeads);
      clearSelection();
    } catch (error) {
      console.error('Erro ao deletar leads selecionados:', error);
    }
  };

  const handleBulkStatusUpdate = async () => {
    setShowBulkStatusDialog(true);
  };

  const handleBulkStatusConfirm = async (status: Lead['status']) => {
    try {
      await updateMultipleLeadsStatus(selectedLeads, status);
      clearSelection();
      setShowBulkStatusDialog(false);
    } catch (error) {
      console.error('Erro ao atualizar status dos leads:', error);
    }
  };

  const handleEmailAction = () => {
    const selectedLeadEmails = leads
      .filter(lead => selectedLeads.includes(lead.id))
      .map(lead => lead.email)
      .filter(Boolean);
    
    if (selectedLeadEmails.length > 0) {
      window.open(`mailto:${selectedLeadEmails.join(',')}`);
    }
  };

  const handleStatusChange = (status: string) => {
    if (status === 'todos' || status === 'novo' || status === 'contato' || 
        status === 'qualificado' || status === 'proposta' || status === 'ganho' || 
        status === 'perdido') {
      setSelectedStatus(status as StatusFilter);
    }
  };

  const handleSelectAll = () => {
    selectAllLeads(filteredLeads);
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">Erro ao carregar leads</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <LeadsHeader onAddLead={handleAddLead} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.thisMonthLeads} este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Pipeline de vendas
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Leads convertidos
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Último Update</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Agora</div>
            <p className="text-xs text-muted-foreground">
              Dados atualizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <LeadsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        totalLeads={filteredLeads.length}
      />

      {/* Selected leads actions */}
      {selectedLeads.length > 0 && viewMode === 'list' && (
        <SelectedLeadsActions
          selectedCount={selectedLeads.length}
          onEmailAction={handleEmailAction}
          onUpdateStatusAction={handleBulkStatusUpdate}
          onDeleteAction={handleBulkDelete}
        />
      )}

      {/* Content */}
      {filteredLeads.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum lead encontrado</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchQuery || selectedStatus !== 'todos' 
                ? 'Tente ajustar os filtros de pesquisa para encontrar leads.'
                : 'Comece adicionando seu primeiro lead para gerenciar seu pipeline de vendas.'
              }
            </p>
            {(!searchQuery && selectedStatus === 'todos') && (
              <Button className="mt-4" onClick={() => {}}>
                Adicionar Primeiro Lead
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'list' ? (
        <LeadsList
          leads={filteredLeads}
          selectedLeads={selectedLeads}
          onLeadSelect={setSelectedLead}
          onToggleSelection={toggleLeadSelection}
          onSelectAll={handleSelectAll}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          onDeleteLead={handleDeleteLead}
        />
      ) : (
        <LeadsKanban
          leadsByStatus={leadsByStatus}
          onLeadSelect={setSelectedLead}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      )}

      {/* Lead Details Dialog */}
      {selectedLead && (
        <LeadDetailsDialog
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          onEmailAction={() => console.log('Email lead:', selectedLead.email)}
          onCallAction={() => console.log('Call lead:', selectedLead.phone)}
          onScheduleAction={() => console.log('Schedule with lead:', selectedLead.name)}          onEditAction={handleUpdateLead}
        />
      )}

      {/* Bulk Status Update Dialog */}
      <BulkStatusDialog
        open={showBulkStatusDialog}
        onClose={() => setShowBulkStatusDialog(false)}
        onConfirm={handleBulkStatusConfirm}
        selectedCount={selectedLeads.length}
      />
    </div>
  );
};

// Bulk Status Dialog Component
const BulkStatusDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: (status: Lead['status']) => void;
  selectedCount: number;
}> = ({ open, onClose, onConfirm, selectedCount }) => {
  const [selectedStatus, setSelectedStatus] = useState<Lead['status']>('novo');

  const handleConfirm = () => {
    onConfirm(selectedStatus);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Atualizar Status</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Atualizar o status de {selectedCount} lead{selectedCount > 1 ? 's' : ''} selecionado{selectedCount > 1 ? 's' : ''}:
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Novo Status:</label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Lead['status'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="contato">Em Contato</SelectItem>
                <SelectItem value="qualificado">Qualificado</SelectItem>
                <SelectItem value="proposta">Proposta</SelectItem>
                <SelectItem value="ganho">Ganho</SelectItem>
                <SelectItem value="perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Atualizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Leads;