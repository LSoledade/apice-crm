import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lead } from '@/hooks/useLeadSelection';
import { 
  User,
  Mail,
  Phone, 
  MapPin,
  CreditCard,
  Send,
  Calendar,
  Clock,
  Tag,
  Edit,
  Save,
  X
} from 'lucide-react';

interface LeadDetailsDialogProps {
  lead: Lead | null;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  onEmailAction: () => void;
  onCallAction: () => void;
  onScheduleAction: () => void;
  onEditAction: (id: string, updates: Partial<Lead>) => Promise<void>;
}

// Adding a comment to trigger a rebuild
export const LeadDetailsDialog: React.FC<LeadDetailsDialogProps> = ({
  lead,
  onClose,
  getStatusColor,
  getStatusText,
  onEmailAction,
  onCallAction,
  onScheduleAction,
  onEditAction
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: lead?.name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    company: lead?.company || '',
    notes: lead?.notes || '',
    status: lead?.status || 'novo'
  });

  if (!lead) return null;

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling edit
      setEditForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company || '',
        notes: lead.notes || '',
        status: lead.status
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onEditAction(lead.id, {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        company: editForm.company,
        notes: editForm.notes,
        status: editForm.status as Lead['status']
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      alert('Erro ao atualizar lead. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={lead !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Detalhes do Lead</DialogTitle>
              <DialogDescription>Veja, edite e gerencie as informações do lead selecionado.</DialogDescription>
              <Badge variant="outline" className={`${getStatusColor(isEditing ? editForm.status : lead.status)} mt-2`}>
                {getStatusText(isEditing ? editForm.status : lead.status)}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditToggle}
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </>
              )}
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Telefone</Label>
                    <Input
                      id="edit-phone"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-company">Empresa</Label>
                    <Input
                      id="edit-company"
                      value={editForm.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={editForm.status} onValueChange={(value) => handleInputChange('status', value)}>
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
                </>
              ) : (
                <>
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      {lead.company && (
                        <p className="text-sm text-gray-600">{lead.company}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                  
                  {lead.city && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{lead.city}</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-1">
                  {lead.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm font-medium">
                  Valor estimado: {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              
              <div className="flex items-center">
                <Send className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Origem: {lead.source}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Cadastrado em: {new Date(lead.date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              {lead.lastContact && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">
                    Último contato: {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-1">Observações:</h4>
                {isEditing ? (
                  <Textarea
                    value={editForm.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Observações sobre o lead"
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {lead.notes || "Nenhuma observação registrada."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEmailAction}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm" onClick={onCallAction}>
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
            <Button variant="outline" size="sm" onClick={onScheduleAction}>
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>
          {isEditing && (
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
