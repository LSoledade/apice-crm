import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MoreHorizontal,
  Phone, 
  Mail,
  Plus,
  GripVertical,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Building,
  MapPin,
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'novo' | 'contato' | 'qualificado' | 'proposta' | 'ganho' | 'perdido';
  value: number;
  date: string;
  company?: string;
  city?: string;
  notes?: string;
  tags: string[];
  lastContact?: string;
}

interface LeadsByStatus {
  [key: string]: Lead[];
}

interface LeadsKanbanProps {
  leadsByStatus: LeadsByStatus;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export const LeadsKanban: React.FC<LeadsKanbanProps> = ({
  leadsByStatus,
  onLeadSelect,
  getStatusColor,
  getStatusText
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Object.entries(leadsByStatus).map(([status, statusLeads]) => (
        <Card key={status} className="border-0 shadow-lg">
          <CardHeader className={`px-4 py-3 ${getStatusColor(status)}`}>
            <CardTitle className="text-base flex items-center justify-between">
              <span>{getStatusText(status)}</span>
              <Badge variant="outline" className="bg-white/70">{statusLeads.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-2">
              {statusLeads.length === 0 ? (
                <div className="text-center py-6 px-2 text-sm text-gray-500">
                  Nenhum lead neste estágio
                </div>
              ) : (
                statusLeads.map(lead => (
                  <div 
                    key={lead.id}
                    className="border rounded-md p-3 bg-white shadow-sm hover:shadow cursor-pointer"
                    onClick={() => onLeadSelect(lead)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium truncate">{lead.name}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Ligar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-xs text-gray-500 mb-2 truncate">{lead.email}</div>
                    <div className="text-sm font-medium">
                      {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{lead.source}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <Button variant="ghost" size="sm" className="w-full text-crm-primary">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Adicionar Lead
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
