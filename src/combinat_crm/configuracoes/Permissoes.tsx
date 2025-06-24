import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  PlusCircle, 
  Shield, 
  Info, 
  Check,
  X, 
  Edit,
  Trash,
  Lock,
  CheckSquare
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserRole, Permission } from '@/interfaces/ConfigSettings';
import { toast } from '@/components/ui/use-toast';

// Dados mockados para exemplo de perfis de acesso
const MOCK_ROLES: UserRole[] = [
  {
    id: '1',
    name: 'Administrador',
    description: 'Acesso total a todas as funcionalidades do sistema',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Gerente',
    description: 'Acesso a gestão de usuários e relatórios',
    permissions: ['users:read', 'users:write', 'reports:read', 'customers:read', 'customers:write', 'financeiro:read']
  },
  {
    id: '3',
    name: 'Vendedor',
    description: 'Acesso a leads e clientes',
    permissions: ['leads:read', 'leads:write', 'customers:read', 'customers:write', 'reports:read:own']
  },
  {
    id: '4',
    name: 'Atendente',
    description: 'Acesso limitado a atendimento',
    permissions: ['customers:read', 'support:read', 'support:write']
  }
];

// Dados mockados para permissões do sistema
const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'users',
    name: 'Usuários',
    description: 'Gestão de usuários do sistema',
    module: 'sistema',
    actions: ['read', 'write', 'delete']
  },
  {
    id: 'roles',
    name: 'Perfis de acesso',
    description: 'Gestão de permissões e perfis',
    module: 'sistema',
    actions: ['read', 'write', 'delete']
  },
  {
    id: 'customers',
    name: 'Clientes',
    description: 'Cadastro e gestão de clientes',
    module: 'crm',
    actions: ['read', 'write', 'delete', 'export']
  },
  {
    id: 'leads',
    name: 'Leads',
    description: 'Gestão de leads e oportunidades',
    module: 'marketing',
    actions: ['read', 'write', 'delete', 'export']
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Movimentações financeiras',
    module: 'financeiro',
    actions: ['read', 'write', 'delete', 'approve']
  },
  {
    id: 'reports',
    name: 'Relatórios',
    description: 'Acesso aos relatórios do sistema',
    module: 'sistema',
    actions: ['read', 'read:own', 'export']
  },
  {
    id: 'support',
    name: 'Suporte',
    description: 'Atendimento e suporte',
    module: 'crm',
    actions: ['read', 'write', 'delete']
  },
  {
    id: 'settings',
    name: 'Configurações',
    description: 'Configurações do sistema',
    module: 'sistema',
    actions: ['read', 'write']
  }
];

// Módulos do sistema
const MODULES = [
  { id: 'all', label: 'Todos' },
  { id: 'sistema', label: 'Sistema' },
  { id: 'crm', label: 'CRM' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'financeiro', label: 'Financeiro' }
];

// Definir tradução das ações
const ACTION_TRANSLATIONS = {
  read: 'Visualizar',
  write: 'Editar',
  delete: 'Excluir',
  export: 'Exportar',
  'read:own': 'Visualizar próprios',
  approve: 'Aprovar'
};

const Permissoes = () => {
  const [roles, setRoles] = useState<UserRole[]>(MOCK_ROLES);
  const [permissions, setPermissions] = useState<Permission[]>(MOCK_PERMISSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoles, setFilteredRoles] = useState<UserRole[]>(MOCK_ROLES);
  const [selectedModule, setSelectedModule] = useState('all');
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isDeleteRoleOpen, setIsDeleteRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [newRole, setNewRole] = useState<Partial<UserRole>>({
    name: '',
    description: '',
    permissions: []
  });

  // Filtrar os perfis conforme pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = roles.filter(role => 
      role.name.toLowerCase().includes(query.toLowerCase()) || 
      role.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  // Filtrar permissões por módulo
  const filteredPermissions = selectedModule === 'all'
    ? permissions
    : permissions.filter(p => p.module === selectedModule);

  // Verificar se uma permissão específica está ativada
  const isPermissionEnabled = (rolePermissions: string[], permissionId: string, action: string) => {
    if (rolePermissions.includes('all')) return true;
    return rolePermissions.includes(`${permissionId}:${action}`);
  };

  // Alternar permissão
  const togglePermission = (
    currentPermissions: string[], 
    permissionId: string, 
    action: string, 
    enabled: boolean
  ) => {
    const permissionKey = `${permissionId}:${action}`;
    
    if (enabled) {
      return [...currentPermissions, permissionKey];
    } else {
      return currentPermissions.filter(p => p !== permissionKey);
    }
  };

  // Alternar todas as ações de uma permissão
  const toggleAllActions = (
    currentPermissions: string[], 
    permissionId: string, 
    actions: string[], 
    enabled: boolean
  ) => {
    // Remover todas as permissões existentes para este ID
    const filteredPermissions = currentPermissions.filter(p => !p.startsWith(`${permissionId}:`));
    
    if (!enabled) {
      return filteredPermissions;
    }
    
    // Adicionar todas as ações
    const newPermissions = actions.map(action => `${permissionId}:${action}`);
    return [...filteredPermissions, ...newPermissions];
  };

  // Adicionar novo perfil
  const handleAddRole = () => {
    if (!newRole.name) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "O nome do perfil é obrigatório.",
      });
      return;
    }

    const role: UserRole = {
      id: (roles.length + 1).toString(),
      name: newRole.name,
      description: newRole.description || '',
      permissions: newRole.permissions || []
    };

    setRoles([...roles, role]);
    setFilteredRoles([...filteredRoles, role]);
    setIsAddRoleOpen(false);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });

    toast({
      title: "Perfil adicionado",
      description: "O perfil foi criado com sucesso.",
    });
  };

  // Atualizar perfil existente
  const handleUpdateRole = () => {
    if (!selectedRole || !selectedRole.name) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "O nome do perfil é obrigatório.",
      });
      return;
    }

    const updatedRoles = roles.map(role => 
      role.id === selectedRole.id ? selectedRole : role
    );
    
    setRoles(updatedRoles);
    setFilteredRoles(
      filteredRoles.map(role => role.id === selectedRole.id ? selectedRole : role)
    );
    setIsEditRoleOpen(false);
    
    toast({
      title: "Perfil atualizado",
      description: "As informações do perfil foram atualizadas com sucesso.",
    });
  };

  // Excluir perfil
  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
    setRoles(updatedRoles);
    setFilteredRoles(filteredRoles.filter(role => role.id !== selectedRole.id));
    setIsDeleteRoleOpen(false);
    
    toast({
      title: "Perfil excluído",
      description: "O perfil foi excluído com sucesso.",
    });
  };

  // Abrir diálogo de edição
  const openEditDialog = (role: UserRole) => {
    setSelectedRole({...role});
    setIsEditRoleOpen(true);
  };

  // Abrir diálogo de exclusão
  const openDeleteDialog = (role: UserRole) => {
    setSelectedRole(role);
    setIsDeleteRoleOpen(true);
  };

  // Verificar se alguma permissão do grupo está ativada
  const hasAnyPermissionInGroup = (rolePermissions: string[], permissionId: string, actions: string[]) => {
    if (rolePermissions.includes('all')) return true;
    return actions.some(action => rolePermissions.includes(`${permissionId}:${action}`));
  };

  // Verificar se todas as permissões do grupo estão ativadas
  const hasAllPermissionsInGroup = (rolePermissions: string[], permissionId: string, actions: string[]) => {
    if (rolePermissions.includes('all')) return true;
    return actions.every(action => rolePermissions.includes(`${permissionId}:${action}`));
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permissões</h1>
          <p className="text-muted-foreground">Gerencie os perfis de acesso e permissões do sistema.</p>
        </div>
        <Button onClick={() => setIsAddRoleOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo perfil
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex mb-4">
          <TabsTrigger value="roles">Perfis de Acesso</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar perfis..."
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
                  <TableHead className="w-[30%]">Perfil</TableHead>
                  <TableHead className="w-[50%]">Descrição</TableHead>
                  <TableHead className="w-[20%]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Shield className={`h-4 w-4 ${
                            role.name === 'Administrador' ? 'text-red-500' : 'text-blue-500'
                          }`} />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(role)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          {role.name !== 'Administrador' && (
                            <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(role)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                      Nenhum perfil encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Filtrar por módulo:</span>
            <div className="flex flex-wrap gap-2">
              {MODULES.map((module) => (
                <Badge
                  key={module.id}
                  variant={selectedModule === module.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedModule(module.id)}
                >
                  {module.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Permissão</TableHead>
                  <TableHead className="w-[30%]">Descrição</TableHead>
                  <TableHead className="w-[15%]">Módulo</TableHead>
                  <TableHead className="w-[30%]">Ações disponíveis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.length > 0 ? (
                  filteredPermissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">
                        {permission.name}
                      </TableCell>
                      <TableCell>{permission.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {permission.module}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {permission.actions.map(action => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {ACTION_TRANSLATIONS[action as keyof typeof ACTION_TRANSLATIONS] || action}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      Nenhuma permissão encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para adicionar perfil */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo perfil</DialogTitle>
            <DialogDescription>
              Defina um nome e as permissões para o novo perfil de acesso.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="role-name">Nome do perfil *</Label>
              <Input
                id="role-name"
                placeholder="Ex: Supervisor de Vendas"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="role-description">Descrição</Label>
              <Input
                id="role-description"
                placeholder="Ex: Acesso a vendas e relatórios"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              />
            </div>
            
            <div className="grid gap-3">
              <Label className="flex items-center gap-2">
                Permissões
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </Label>
              
              <div className="border rounded-md max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow>
                      <TableHead className="w-[40%]">Recurso</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium">{permission.name}</div>
                              <div className="text-xs text-muted-foreground">{permission.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {/* Checkbox para selecionar todas as ações */}
                            <div className="flex items-center gap-2 pb-1 border-b border-dashed">
                              <Checkbox 
                                id={`${permission.id}-all`}
                                checked={hasAllPermissionsInGroup(newRole.permissions || [], permission.id, permission.actions)}
                                onCheckedChange={(checked) => {
                                  const updatedPermissions = toggleAllActions(
                                    newRole.permissions || [],
                                    permission.id,
                                    permission.actions,
                                    checked === true
                                  );
                                  setNewRole({...newRole, permissions: updatedPermissions});
                                }}
                              />
                              <Label htmlFor={`${permission.id}-all`} className="text-sm font-medium">
                                Todas as ações
                              </Label>
                            </div>
                            
                            {/* Checkbox para cada ação */}
                            <div className="grid grid-cols-2 gap-2">
                              {permission.actions.map((action) => (
                                <div key={action} className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`${permission.id}-${action}`}
                                    checked={isPermissionEnabled(newRole.permissions || [], permission.id, action)}
                                    onCheckedChange={(checked) => {
                                      const updatedPermissions = togglePermission(
                                        newRole.permissions || [],
                                        permission.id,
                                        action,
                                        checked === true
                                      );
                                      setNewRole({...newRole, permissions: updatedPermissions});
                                    }}
                                  />
                                  <Label htmlFor={`${permission.id}-${action}`} className="text-xs">
                                    {ACTION_TRANSLATIONS[action as keyof typeof ACTION_TRANSLATIONS] || action}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddRole}>
              Adicionar perfil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para editar perfil */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Atualize as informações e permissões do perfil.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="grid gap-6 py-4">
              <div className="grid gap-3">
                <Label htmlFor="edit-role-name">Nome do perfil *</Label>
                <Input
                  id="edit-role-name"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
                  disabled={selectedRole.name === 'Administrador'}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="edit-role-description">Descrição</Label>
                <Input
                  id="edit-role-description"
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({...selectedRole, description: e.target.value})}
                />
              </div>
              
              {selectedRole.name === 'Administrador' ? (
                <div className="bg-gray-50 border rounded-md p-4 flex items-center gap-4">
                  <Lock className="h-10 w-10 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Permissões de administrador</h3>
                    <p className="text-sm text-muted-foreground">
                      O perfil de Administrador tem acesso total a todas as funcionalidades do sistema e não pode ser modificado.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Label className="flex items-center gap-2">
                    Permissões
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </Label>
                  
                  <div className="border rounded-md max-h-[300px] overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-white">
                        <TableRow>
                          <TableHead className="w-[40%]">Recurso</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissions.map((permission) => (
                          <TableRow key={permission.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="font-medium">{permission.name}</div>
                                  <div className="text-xs text-muted-foreground">{permission.description}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                {/* Checkbox para selecionar todas as ações */}
                                <div className="flex items-center gap-2 pb-1 border-b border-dashed">
                                  <Checkbox 
                                    id={`edit-${permission.id}-all`}
                                    checked={hasAllPermissionsInGroup(selectedRole.permissions, permission.id, permission.actions)}
                                    onCheckedChange={(checked) => {
                                      const updatedPermissions = toggleAllActions(
                                        selectedRole.permissions,
                                        permission.id,
                                        permission.actions,
                                        checked === true
                                      );
                                      setSelectedRole({...selectedRole, permissions: updatedPermissions});
                                    }}
                                  />
                                  <Label htmlFor={`edit-${permission.id}-all`} className="text-sm font-medium">
                                    Todas as ações
                                  </Label>
                                </div>
                                
                                {/* Checkbox para cada ação */}
                                <div className="grid grid-cols-2 gap-2">
                                  {permission.actions.map((action) => (
                                    <div key={action} className="flex items-center gap-2">
                                      <Checkbox 
                                        id={`edit-${permission.id}-${action}`}
                                        checked={isPermissionEnabled(selectedRole.permissions, permission.id, action)}
                                        onCheckedChange={(checked) => {
                                          const updatedPermissions = togglePermission(
                                            selectedRole.permissions,
                                            permission.id,
                                            action,
                                            checked === true
                                          );
                                          setSelectedRole({...selectedRole, permissions: updatedPermissions});
                                        }}
                                      />
                                      <Label htmlFor={`edit-${permission.id}-${action}`} className="text-xs">
                                        {ACTION_TRANSLATIONS[action as keyof typeof ACTION_TRANSLATIONS] || action}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRole}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para confirmar exclusão */}
      <Dialog open={isDeleteRoleOpen} onOpenChange={setIsDeleteRoleOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Excluir perfil</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este perfil? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="py-4">
              <div className="p-3 bg-gray-50 rounded-md flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{selectedRole.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-red-600">
                <p>
                  <strong>Atenção:</strong> Os usuários com este perfil perderão as permissões associadas.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteRoleOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Permissoes;
