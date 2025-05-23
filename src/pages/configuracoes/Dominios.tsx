import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Search, Globe, CheckCircle, XCircle, PlusCircle, Trash, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Domain } from '@/interfaces/ConfigSettings';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Dados mockados para exemplo
const MOCK_DOMAINS: Domain[] = [
  {
    id: '1',
    name: 'Principal',
    url: 'apice-crm.com.br',
    verified: true,
    primary: true,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Marketing',
    url: 'marketing.apice-crm.com.br',
    verified: true,
    primary: false,
    createdAt: new Date('2023-03-10')
  },
  {
    id: '3',
    name: 'Suporte',
    url: 'suporte.apice-crm.com.br',
    verified: false,
    primary: false,
    createdAt: new Date('2023-05-20')
  }
];

const VERIFICATION_STEPS = [
  'Acesse o painel de configuração do seu provedor de DNS',
  'Adicione um registro TXT com o nome "@" ou hostname vazio',
  'No campo de valor, insira o código de verificação: apice-verify-18723645',
  'Aguarde a propagação do DNS (pode levar até 48 horas)',
  'Clique em "Verificar" para confirmar a configuração'
];

const Dominios = () => {
  const [domains, setDomains] = useState<Domain[]>(MOCK_DOMAINS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>(MOCK_DOMAINS);
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [isEditDomainOpen, setIsEditDomainOpen] = useState(false);
  const [isDeleteDomainOpen, setIsDeleteDomainOpen] = useState(false);
  const [isVerifyDomainOpen, setIsVerifyDomainOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [newDomain, setNewDomain] = useState<Partial<Domain>>({
    name: '',
    url: '',
    verified: false,
    primary: false
  });
  
  // Filtrar domínios conforme pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = domains.filter(domain => 
      domain.name.toLowerCase().includes(query.toLowerCase()) || 
      domain.url.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDomains(filtered);
  };

  // Validar formato do domínio
  const isValidDomain = (url: string) => {
    const regex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return regex.test(url);
  };

  // Adicionar novo domínio
  const handleAddDomain = () => {
    if (!newDomain.name || !newDomain.url) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (!isValidDomain(newDomain.url)) {
      toast({
        variant: "destructive",
        title: "Domínio inválido",
        description: "O formato do domínio é inválido.",
      });
      return;
    }

    const domain: Domain = {
      id: (domains.length + 1).toString(),
      name: newDomain.name,
      url: newDomain.url,
      verified: false,
      primary: domains.length === 0 ? true : false,
      createdAt: new Date()
    };

    setDomains([...domains, domain]);
    setFilteredDomains([...filteredDomains, domain]);
    setIsAddDomainOpen(false);
    setNewDomain({
      name: '',
      url: '',
      verified: false,
      primary: false
    });

    toast({
      title: "Domínio adicionado",
      description: "O domínio foi adicionado com sucesso.",
    });
  };

  // Atualizar domínio existente
  const handleUpdateDomain = () => {
    if (!selectedDomain) return;

    if (!selectedDomain.name || !selectedDomain.url) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (!isValidDomain(selectedDomain.url)) {
      toast({
        variant: "destructive",
        title: "Domínio inválido",
        description: "O formato do domínio é inválido.",
      });
      return;
    }

    // Se tornar primário, remover o status de primário de outros domínios
    let updatedDomains = [...domains];
    if (selectedDomain.primary) {
      updatedDomains = updatedDomains.map(domain => ({
        ...domain,
        primary: domain.id === selectedDomain.id
      }));
    }

    const updatedDomainsList = updatedDomains.map(domain => 
      domain.id === selectedDomain.id ? selectedDomain : domain
    );
    
    setDomains(updatedDomainsList);
    setFilteredDomains(
      filteredDomains.map(domain => domain.id === selectedDomain.id ? selectedDomain : domain)
    );
    setIsEditDomainOpen(false);
    
    toast({
      title: "Domínio atualizado",
      description: "As informações do domínio foram atualizadas com sucesso.",
    });
  };

  // Definir como primário
  const handleSetPrimary = (domainId: string) => {
    const updatedDomains = domains.map(domain => ({
      ...domain,
      primary: domain.id === domainId
    }));
    setDomains(updatedDomains);
    setFilteredDomains(
      filteredDomains.map(domain => ({
        ...domain,
        primary: domain.id === domainId
      }))
    );
    
    toast({
      title: "Domínio primário atualizado",
      description: "O domínio primário foi atualizado com sucesso.",
    });
  };

  // Verificar domínio
  const handleVerifyDomain = () => {
    if (!selectedDomain) return;
    
    // Simulando uma verificação bem-sucedida
    setTimeout(() => {
      const updatedDomains = domains.map(domain => 
        domain.id === selectedDomain.id ? { ...domain, verified: true } : domain
      );
      setDomains(updatedDomains);
      setFilteredDomains(
        filteredDomains.map(domain => 
          domain.id === selectedDomain.id ? { ...domain, verified: true } : domain
        )
      );
      setIsVerifyDomainOpen(false);
      
      toast({
        title: "Domínio verificado",
        description: "O domínio foi verificado com sucesso.",
      });
    }, 1500);
  };

  // Excluir domínio
  const handleDeleteDomain = () => {
    if (!selectedDomain) return;
    
    // Não permitir excluir domínio primário
    if (selectedDomain.primary) {
      toast({
        variant: "destructive",
        title: "Operação não permitida",
        description: "Não é possível excluir o domínio primário. Defina outro domínio como primário primeiro.",
      });
      setIsDeleteDomainOpen(false);
      return;
    }
    
    const updatedDomains = domains.filter(domain => domain.id !== selectedDomain.id);
    setDomains(updatedDomains);
    setFilteredDomains(filteredDomains.filter(domain => domain.id !== selectedDomain.id));
    setIsDeleteDomainOpen(false);
    
    toast({
      title: "Domínio excluído",
      description: "O domínio foi excluído com sucesso.",
    });
  };

  // Abrir dialog de edição
  const openEditDialog = (domain: Domain) => {
    setSelectedDomain({...domain});
    setIsEditDomainOpen(true);
  };

  // Abrir dialog de verificação
  const openVerifyDialog = (domain: Domain) => {
    setSelectedDomain({...domain});
    setIsVerifyDomainOpen(true);
  };

  // Abrir dialog de confirmação para excluir
  const openDeleteDialog = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsDeleteDomainOpen(true);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domínios</h1>
          <p className="text-muted-foreground">Gerencie os domínios do seu CRM.</p>
        </div>
        <Button onClick={() => setIsAddDomainOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar domínio
        </Button>
      </div>
      
      <Separator className="my-6" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Como funcionam os domínios?</CardTitle>
          <CardDescription>
            Os domínios permitem que você personalize o acesso ao seu CRM e serviços relacionados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1">Domínio principal</h3>
              <p className="text-sm text-muted-foreground">
                Usado para acessar o painel principal do CRM e é o domínio padrão para todos os usuários.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1">Domínios adicionais</h3>
              <p className="text-sm text-muted-foreground">
                Podem ser usados para serviços específicos como marketing, suporte ou áreas personalizadas.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1">Verificação</h3>
              <p className="text-sm text-muted-foreground">
                Confirma a propriedade do domínio e permite utilizá-lo com os serviços do CRM.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar domínios..."
            className="pl-8"
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Domínio</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Primário</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.length > 0 ? (
              filteredDomains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell className="font-medium">{domain.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {domain.url}
                    </div>
                  </TableCell>
                  <TableCell>
                    {domain.verified ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Verificado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Não verificado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {domain.primary ? (
                      <Badge className="bg-blue-100 text-blue-800">Primário</Badge>
                    ) : (
                      <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer" onClick={() => handleSetPrimary(domain.id)}>
                        Definir como primário
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(domain.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!domain.verified && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openVerifyDialog(domain)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verificar
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Abrir menu</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(domain)}>
                            Editar
                          </DropdownMenuItem>
                          {!domain.primary && (
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => openDeleteDialog(domain)}
                            >
                              Excluir
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Nenhum domínio encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialog para adicionar domínio */}
      <Dialog open={isAddDomainOpen} onOpenChange={setIsAddDomainOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo domínio</DialogTitle>
            <DialogDescription>
              Adicione um novo domínio para personalizar o acesso ao seu CRM.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do domínio</Label>
              <Input
                id="name"
                placeholder="Ex: Principal, Marketing, Suporte"
                value={newDomain.name}
                onChange={(e) => setNewDomain({...newDomain, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="url">URL do domínio</Label>
              <Input
                id="url"
                placeholder="Ex: seudominio.com.br"
                value={newDomain.url}
                onChange={(e) => setNewDomain({...newDomain, url: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Insira apenas o domínio sem http:// ou https://
              </p>
            </div>
            
            {domains.length === 0 && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="primary"
                  checked={true}
                  disabled={true}
                />
                <Label htmlFor="primary">
                  Domínio primário
                  <span className="block text-xs text-muted-foreground">
                    Primeiro domínio é automaticamente definido como primário
                  </span>
                </Label>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDomainOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddDomain}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para editar domínio */}
      <Dialog open={isEditDomainOpen} onOpenChange={setIsEditDomainOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar domínio</DialogTitle>
            <DialogDescription>
              Atualize as informações do domínio.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDomain && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome do domínio</Label>
                <Input
                  id="edit-name"
                  value={selectedDomain.name}
                  onChange={(e) => setSelectedDomain({...selectedDomain, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL do domínio</Label>
                <Input
                  id="edit-url"
                  value={selectedDomain.url}
                  onChange={(e) => setSelectedDomain({...selectedDomain, url: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Alterar a URL irá requerer uma nova verificação.
                </p>
              </div>
              
              {!selectedDomain.primary && domains.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-primary"
                    checked={selectedDomain.primary}
                    onCheckedChange={(checked) => setSelectedDomain({...selectedDomain, primary: checked})}
                  />
                  <Label htmlFor="edit-primary">
                    Definir como domínio primário
                    <span className="block text-xs text-muted-foreground">
                      Isso substituirá o domínio primário atual
                    </span>
                  </Label>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDomainOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateDomain}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para verificar domínio */}
      <Dialog open={isVerifyDomainOpen} onOpenChange={setIsVerifyDomainOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Verificar domínio</DialogTitle>
            <DialogDescription>
              Siga os passos abaixo para verificar seu domínio.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDomain && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-blue-500" />
                <p className="font-medium">{selectedDomain.url}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Passos para verificação:</h3>
                <ol className="space-y-2">
                  {VERIFICATION_STEPS.map((step, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                <p className="text-sm text-amber-800 flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span>A verificação pode levar até 48 horas para concluir devido à propagação do DNS.</span>
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDomainOpen(false)}>
              Voltar
            </Button>
            <Button onClick={handleVerifyDomain}>
              Verificar domínio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de confirmação para excluir */}
      <AlertDialog open={isDeleteDomainOpen} onOpenChange={setIsDeleteDomainOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir domínio</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este domínio? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {selectedDomain && (
            <div className="py-2">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <Globe className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{selectedDomain.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDomain.url}</p>
                </div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={handleDeleteDomain}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dominios;
