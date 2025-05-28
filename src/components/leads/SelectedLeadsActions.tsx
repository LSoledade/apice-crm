import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mail,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface SelectedLeadsActionsProps {
  selectedCount: number;
  onEmailAction: () => void;
  onUpdateStatusAction: () => void;
  onDeleteAction: () => void;
}

export const SelectedLeadsActions: React.FC<SelectedLeadsActionsProps> = ({
  selectedCount,
  onEmailAction,
  onUpdateStatusAction,
  onDeleteAction
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border animate-in slide-in-from-top">
      <span className="text-sm font-medium">
        {selectedCount} {selectedCount === 1 ? 'lead selecionado' : 'leads selecionados'}
      </span>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onEmailAction}>
          <Mail className="h-3.5 w-3.5 mr-1" />
          Email
        </Button>
        <Button size="sm" variant="outline" onClick={onUpdateStatusAction}>
          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
          Atualizar Status
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onDeleteAction}
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Excluir
        </Button>
      </div>
    </div>
  );
};
