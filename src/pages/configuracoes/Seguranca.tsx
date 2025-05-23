import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Lock, Shield, Eye, EyeOff, AlertCircle, CheckCircle, RefreshCw, History, User, Search } from 'lucide-react';

// Dados mockados para logs de acesso
const ACCESS_LOGS = [
  { 
    id: 1, 
    user: 'João Silva', 
    email: 'joao@apice.com.br',
    action: 'Login', 
    status: 'success', 
    ip: '192.168.1.100', 
    device: 'Chrome / Windows', 
    date: new Date('2023-05-15T14:30:00')
  },
  { 
    id: 2, 
    user: 'Maria Oliveira', 
    email: 'maria@apice.com.br',
    action: 'Login', 
    status: 'failed', 
    ip: '187.54.222.15', 
    device: 'Safari / MacOS', 
    date: new Date('2023-05-15T09:15:00')
  },
  { 
    id: 3, 
    user: 'Pedro Santos', 
    email: 'pedro@apice.com.br',
    action: 'Alteração de senha', 
    status: 'success', 
    ip: '201.18.64.77', 
    device: 'Firefox / Linux', 
    date: new Date('2023-05-14T17:22:00')
  },
  { 
    id: 4, 
    user: 'Maria Oliveira', 
    email: 'maria@apice.com.br',
    action: 'Login', 
    status: 'success', 
    ip: '187.54.222.15', 
    device: 'Safari / MacOS', 
    date: new Date('2023-05-14T09:22:00')
  },
  { 
    id: 5, 
    user: 'Admin', 
    email: 'admin@apice.com.br',
    action: 'Alteração de permissões', 
    status: 'success', 
    ip: '192.168.1.101', 
    device: 'Edge / Windows', 
    date: new Date('2023-05-13T11:45:00')
  },
];

const Seguranca = () => {
  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: true,
    maxLoginAttempts: 5
  });
  
  const [twoFactorSettings, setTwoFactorSettings] = useState({
    enabled: false,
    required: false,
    allowSMS: true,
    allowEmail: true,
    allowAuthenticatorApp: true,
    rememberDevice: true,
    rememberDays: 30
  });

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    autoExtend: true,
    singleSession: false,
    forceLogoutOnPasswordChange: true
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(ACCESS_LOGS);

  // Filtrar logs de acesso
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = ACCESS_LOGS.filter(log => 
      log.user.toLowerCase().includes(query.toLowerCase()) || 
      log.email.toLowerCase().includes(query.toLowerCase()) ||
      log.action.toLowerCase().includes(query.toLowerCase()) ||
      log.ip.includes(query)
    );
    setFilteredLogs(filtered);
  };

  // Salvar configurações de senha
  const savePasswordSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As políticas de senha foram atualizadas com sucesso.",
    });
  };

  // Salvar configurações de 2FA
  const saveTwoFactorSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de autenticação em dois fatores foram atualizadas com sucesso.",
    });
  };

  // Salvar configurações de sessão
  const saveSessionSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de sessão foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Segurança</h1>
          <p className="text-muted-foreground">Configure as políticas de segurança do seu CRM.</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="passwords" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
          <TabsTrigger value="passwords">Senhas</TabsTrigger>
          <TabsTrigger value="2fa">Autenticação 2FA</TabsTrigger>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="logs">Logs de acesso</TabsTrigger>
        </TabsList>
        
        {/* Tab de Políticas de Senha */}
        <TabsContent value="passwords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Políticas de senha
              </CardTitle>
              <CardDescription>
                Configure os requisitos de senha para todos os usuários do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="minLength">Tamanho mínimo da senha</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="minLength"
                      type="number"
                      min="6"
                      max="20"
                      className="w-24"
                      value={passwordSettings.minLength}
                      onChange={(e) => setPasswordSettings({...passwordSettings, minLength: Number(e.target.value)})}
                    />
                    <span className="text-sm text-gray-500">caracteres</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recomendamos no mínimo 8 caracteres para maior segurança.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireUppercase">Exigir letra maiúscula</Label>
                      <Switch
                        id="requireUppercase"
                        checked={passwordSettings.requireUppercase}
                        onCheckedChange={(checked) => setPasswordSettings({...passwordSettings, requireUppercase: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireLowercase">Exigir letra minúscula</Label>
                      <Switch
                        id="requireLowercase"
                        checked={passwordSettings.requireLowercase}
                        onCheckedChange={(checked) => setPasswordSettings({...passwordSettings, requireLowercase: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireNumbers">Exigir números</Label>
                      <Switch
                        id="requireNumbers"
                        checked={passwordSettings.requireNumbers}
                        onCheckedChange={(checked) => setPasswordSettings({...passwordSettings, requireNumbers: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireSpecialChars">Exigir caracteres especiais</Label>
                      <Switch
                        id="requireSpecialChars"
                        checked={passwordSettings.requireSpecialChars}
                        onCheckedChange={(checked) => setPasswordSettings({...passwordSettings, requireSpecialChars: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <Label htmlFor="expiryDays">Expiração da senha</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="expiryDays"
                      type="number"
                      min="0"
                      className="w-24"
                      value={passwordSettings.expiryDays}
                      onChange={(e) => setPasswordSettings({...passwordSettings, expiryDays: Number(e.target.value)})}
                    />
                    <span className="text-sm text-gray-500">dias (0 = nunca expira)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="preventReuse">Prevenir reutilização de senhas</Label>
                    <p className="text-xs text-muted-foreground">
                      Impede que o usuário reutilize senhas anteriores.
                    </p>
                  </div>
                  <Switch
                    id="preventReuse"
                    checked={passwordSettings.preventReuse}
                    onCheckedChange={(checked) => setPasswordSettings({...passwordSettings, preventReuse: checked})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="maxLoginAttempts">Tentativas máximas de login</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      className="w-24"
                      value={passwordSettings.maxLoginAttempts}
                      onChange={(e) => setPasswordSettings({...passwordSettings, maxLoginAttempts: Number(e.target.value)})}
                    />
                    <span className="text-sm text-gray-500">tentativas até bloqueio</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={savePasswordSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exemplo de senha segura</CardTitle>
              <CardDescription>
                Com base nas configurações atuais, uma senha segura deve ter:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">No mínimo {passwordSettings.minLength} caracteres</span>
                </div>
                
                {passwordSettings.requireUppercase && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Pelo menos uma letra maiúscula (A-Z)</span>
                  </div>
                )}
                
                {passwordSettings.requireLowercase && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Pelo menos uma letra minúscula (a-z)</span>
                  </div>
                )}
                
                {passwordSettings.requireNumbers && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Pelo menos um número (0-9)</span>
                  </div>
                )}
                
                {passwordSettings.requireSpecialChars && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Pelo menos um caractere especial (!@#$%^&*)</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Autenticação em dois fatores */}
        <TabsContent value="2fa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Autenticação em dois fatores (2FA)
              </CardTitle>
              <CardDescription>
                Configure as opções de autenticação em dois fatores para aumentar a segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div>
                      <h3 className="font-medium">Ativar 2FA para o sistema</h3>
                      <p className="text-xs text-muted-foreground">
                        Permite que usuários configurem autenticação em dois fatores.
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorSettings.enabled}
                      onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, enabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div>
                      <h3 className="font-medium">Tornar 2FA obrigatório</h3>
                      <p className="text-xs text-muted-foreground">
                        Todos os usuários deverão configurar 2FA para acessar o sistema.
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorSettings.required}
                      onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, required: checked})}
                      disabled={!twoFactorSettings.enabled}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Métodos de verificação permitidos</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <Label htmlFor="allowSMS" className="flex items-center gap-2">
                        SMS
                      </Label>
                      <Switch
                        id="allowSMS"
                        checked={twoFactorSettings.allowSMS}
                        onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, allowSMS: checked})}
                        disabled={!twoFactorSettings.enabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <Label htmlFor="allowEmail" className="flex items-center gap-2">
                        Email
                      </Label>
                      <Switch
                        id="allowEmail"
                        checked={twoFactorSettings.allowEmail}
                        onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, allowEmail: checked})}
                        disabled={!twoFactorSettings.enabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <Label htmlFor="allowAuthenticatorApp" className="flex items-center gap-2">
                        App autenticador
                      </Label>
                      <Switch
                        id="allowAuthenticatorApp"
                        checked={twoFactorSettings.allowAuthenticatorApp}
                        onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, allowAuthenticatorApp: checked})}
                        disabled={!twoFactorSettings.enabled}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rememberDevice">Lembrar dispositivo</Label>
                    <p className="text-xs text-muted-foreground">
                      Permite que um dispositivo verificado seja lembrado por um período.
                    </p>
                  </div>
                  <Switch
                    id="rememberDevice"
                    checked={twoFactorSettings.rememberDevice}
                    onCheckedChange={(checked) => setTwoFactorSettings({...twoFactorSettings, rememberDevice: checked})}
                    disabled={!twoFactorSettings.enabled}
                  />
                </div>
                
                {twoFactorSettings.rememberDevice && (
                  <div className="grid gap-2">
                    <Label htmlFor="rememberDays">Lembrar dispositivo por</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="rememberDays"
                        type="number"
                        min="1"
                        max="90"
                        className="w-24"
                        value={twoFactorSettings.rememberDays}
                        onChange={(e) => setTwoFactorSettings({...twoFactorSettings, rememberDays: Number(e.target.value)})}
                        disabled={!twoFactorSettings.enabled}
                      />
                      <span className="text-sm text-gray-500">dias</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveTwoFactorSettings} disabled={!twoFactorSettings.enabled}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab de Sessões */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Controle de sessões
              </CardTitle>
              <CardDescription>
                Configure como as sessões de usuário são gerenciadas no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Tempo limite de inatividade</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      className="w-24"
                      value={sessionSettings.sessionTimeout}
                      onChange={(e) => setSessionSettings({...sessionSettings, sessionTimeout: Number(e.target.value)})}
                    />
                    <span className="text-sm text-gray-500">minutos</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    O usuário será desconectado após este período de inatividade.
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoExtend">Estender sessão automaticamente</Label>
                    <p className="text-xs text-muted-foreground">
                      A sessão é estendida automaticamente enquanto o usuário estiver ativo.
                    </p>
                  </div>
                  <Switch
                    id="autoExtend"
                    checked={sessionSettings.autoExtend}
                    onCheckedChange={(checked) => setSessionSettings({...sessionSettings, autoExtend: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="singleSession">Sessão única por usuário</Label>
                    <p className="text-xs text-muted-foreground">
                      Permite apenas uma sessão ativa por usuário. Login em um novo dispositivo desconecta sessões anteriores.
                    </p>
                  </div>
                  <Switch
                    id="singleSession"
                    checked={sessionSettings.singleSession}
                    onCheckedChange={(checked) => setSessionSettings({...sessionSettings, singleSession: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="forceLogoutOnPasswordChange">Desconectar ao alterar senha</Label>
                    <p className="text-xs text-muted-foreground">
                      Força o logout de todas as sessões quando o usuário altera sua senha.
                    </p>
                  </div>
                  <Switch
                    id="forceLogoutOnPasswordChange"
                    checked={sessionSettings.forceLogoutOnPasswordChange}
                    onCheckedChange={(checked) => setSessionSettings({...sessionSettings, forceLogoutOnPasswordChange: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveSessionSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tab de Logs de acesso */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Logs de acesso
              </CardTitle>
              <CardDescription>
                Visualize o histórico de acessos e atividades de segurança no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuário, email ou ação..."
                    className="pl-8"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="success">Sucesso</SelectItem>
                    <SelectItem value="failed">Falha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Dispositivo</TableHead>
                      <TableHead>Data/Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{log.user}</span>
                              <span className="text-xs text-muted-foreground">{log.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>
                            {log.status === 'success' ? (
                              <Badge variant="success">Sucesso</Badge>
                            ) : (
                              <Badge variant="destructive">Falha</Badge>
                            )}
                          </TableCell>
                          <TableCell>{log.ip}</TableCell>
                          <TableCell>{log.device}</TableCell>
                          <TableCell>{format(log.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Nenhum log encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Seguranca;
