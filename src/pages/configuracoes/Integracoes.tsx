import React, { useState } from 'react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Integration } from '@/interfaces/ConfigSettings';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle, ExternalLink, KeySquare, Clock, Settings, RefreshCcw, Trash, ChevronRight, Mail } from 'lucide-react';
import { format } from 'date-fns';

// Dados mockados para exemplo
const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: '1',
    name: 'Google Analytics',
    type: 'analytics',
    description: 'Rastreie o comportamento dos usuários e meça o desempenho do marketing',
    enabled: true,
    apiKey: 'GA-1234567890',
    lastSync: new Date('2023-05-15'),
    createdAt: new Date('2022-11-01')
  },
  {
    id: '2',
    name: 'Mailchimp',
    type: 'email',
    description: 'Integração com a plataforma de automação de marketing por email',
    enabled: true,
    apiKey: 'mc-api-3456789012',
    webhookUrl: 'https://apice-crm.com.br/api/webhook/mailchimp',
    lastSync: new Date('2023-05-20'),
    createdAt: new Date('2023-01-15')
  },
  {
    id: '3',
    name: 'PayPal',
    type: 'payment',
    description: 'Processador de pagamentos online',
    enabled: false,
    createdAt: new Date('2023-03-10')
  }
];

// Categorias de integração
const INTEGRATION_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'payment', label: 'Pagamentos' },
  { id: 'crm', label: 'CRM' },
  { id: 'social', label: 'Redes Sociais' }
];

// Integrações disponíveis
const AVAILABLE_INTEGRATIONS = [
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    type: 'analytics',
    description: 'Rastreie o comportamento dos usuários e meça o desempenho do marketing',
    icon: '/placeholder.svg'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    type: 'email',
    description: 'Integração com a plataforma de automação de marketing por email',
    icon: '/placeholder.svg'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'payment',
    description: 'Processador de pagamentos online',
    icon: '/placeholder.svg'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    type: 'payment',
    description: 'Gateway de pagamento para empresas online',
    icon: '/placeholder.svg'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    type: 'social',
    description: 'Conecte-se com sua página ou conta de anúncios do Facebook',
    icon: '/placeholder.svg'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    type: 'crm',
    description: 'Sincronização de contatos e leads entre plataformas',
    icon: '/placeholder.svg'
  }
];

const Integracoes = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);
  const [isConfigIntegrationOpen, setIsConfigIntegrationOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  
  // Filtrar as integrações disponíveis por categoria
  const filteredAvailableIntegrations = selectedCategory === 'all'
    ? AVAILABLE_INTEGRATIONS
    : AVAILABLE_INTEGRATIONS.filter(i => i.type === selectedCategory);

  // Verificar se uma integração já está instalada
  const isIntegrationInstalled = (id: string) => {
    return integrations.some(i => i.id === id);
  };

  // Atualizar as configurações de uma integração
  const handleUpdateIntegration = () => {
    if (!selectedIntegration) return;
    
    const updatedIntegration = {
      ...selectedIntegration,
      apiKey,
      webhookUrl,
      lastSync: new Date()
    };
    
    setIntegrations(
      integrations.map(integration => 
        integration.id === selectedIntegration.id ? updatedIntegration : integration
      )
    );
    
    setIsConfigIntegrationOpen(false);
    
    toast({
      title: "Configurações atualizadas",
      description: "As configurações da integração foram atualizadas com sucesso.",
    });
  };
  
  // Adicionar nova integração
  const handleAddIntegration = (integrationId: string) => {
    const available = AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId);
    if (!available) return;
    
    const newIntegration: Integration = {
      id: integrationId,
      name: available.name,
      type: available.type,
      description: available.description,
      enabled: true,
      createdAt: new Date()
    };
    
    setIntegrations([...integrations, newIntegration]);
    
    toast({
      title: "Integração adicionada",
      description: `A integração com ${available.name} foi adicionada com sucesso.`,
    });
  };

  // Remover integração
  const handleRemoveIntegration = (id: string) => {
    setIntegrations(integrations.filter(integration => integration.id !== id));
    
    toast({
      title: "Integração removida",
      description: "A integração foi removida com sucesso.",
    });
  };

  // Alternar o status ativo/inativo de uma integração
  const toggleIntegrationStatus = (id: string) => {
    setIntegrations(
      integrations.map(integration => 
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
      )
    );
  };

  // Sincronizar uma integração
  const handleSyncIntegration = (id: string) => {
    toast({
      title: "Sincronização iniciada",
      description: "A sincronização foi iniciada e pode levar alguns minutos.",
    });

    // Simulação da sincronização
    setTimeout(() => {
      setIntegrations(
        integrations.map(integration => 
          integration.id === id ? { ...integration, lastSync: new Date() } : integration
        )
      );
      
      toast({
        title: "Sincronização concluída",
        description: "Os dados foram sincronizados com sucesso.",
      });
    }, 2000);
  };

  // Abrir dialog de configuração
  const openConfigDialog = (integration: Integration) => {
    setSelectedIntegration(integration);
    setApiKey(integration.apiKey || '');
    setWebhookUrl(integration.webhookUrl || '');
    setIsConfigIntegrationOpen(true);
  };

  // Renderização de ícone com base no tipo de integração
  const renderIntegrationIcon = (type: string) => {
    switch(type) {
      case 'analytics':
        return <Chart className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'payment':
        return <CreditCard className="h-5 w-5" />;
      case 'crm':
        return <Users className="h-5 w-5" />;
      case 'social':
        return <Globe className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
          <p className="text-muted-foreground">Conecte seu CRM com outras ferramentas e serviços.</p>
        </div>
        <Button onClick={() => setIsAddIntegrationOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova integração
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="active">Integrações ativas</TabsTrigger>
          <TabsTrigger value="available">Adicionar integração</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {integrations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {integrations.map(integration => (
                <Card key={integration.id} className={integration.enabled ? "" : "opacity-75"}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 w-8 h-8 rounded-md flex items-center justify-center text-primary">
                          {renderIntegrationIcon(integration.type)}
                        </div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={integration.enabled ? "default" : "outline"}>
                        {integration.enabled ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm space-y-2">
                      {integration.apiKey && (
                        <div className="flex items-center gap-2">
                          <KeySquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">API Key: {integration.apiKey.substring(0, 4)}...{integration.apiKey.substring(integration.apiKey.length - 4)}</span>
                        </div>
                      )}
                      {integration.lastSync && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Última sincronização: {format(integration.lastSync, 'dd/MM/yyyy HH:mm')}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => toggleIntegrationStatus(integration.id)}
                      />
                      <Label htmlFor="active">
                        {integration.enabled ? "Ativado" : "Desativado"}
                      </Label>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleSyncIntegration(integration.id)}>
                        <RefreshCcw className="mr-1 h-4 w-4" />
                        Sincronizar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openConfigDialog(integration)}>
                        <Settings className="mr-1 h-4 w-4" />
                        Configurar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <p className="text-muted-foreground">Nenhuma integração configurada</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsAddIntegrationOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar integração
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Filtrar por:</span>
            <div className="flex flex-wrap gap-2">
              {INTEGRATION_CATEGORIES.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAvailableIntegrations.map(integration => {
              const installed = isIntegrationInstalled(integration.id);
              
              return (
                <Card key={integration.id} className={installed ? "opacity-75 border-dashed" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 flex items-center justify-center">
                          <img 
                            src={integration.icon} 
                            alt={integration.name} 
                            className="rounded-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-xs">{integration.type}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={installed ? "outline" : "secondary"}>
                        {installed ? "Instalado" : "Disponível"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{integration.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => window.open('https://exemplo.com/docs', '_blank')}
                    >
                      <ExternalLink className="mr-1 h-3.5 w-3.5" />
                      Ver documentação
                    </Button>
                    
                    {installed ? (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleRemoveIntegration(integration.id)}
                      >
                        <Trash className="mr-1 h-3.5 w-3.5" />
                        Remover
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleAddIntegration(integration.id)}
                      >
                        <PlusCircle className="mr-1 h-3.5 w-3.5" />
                        Adicionar
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para configurar integração */}
      <Dialog open={isConfigIntegrationOpen} onOpenChange={setIsConfigIntegrationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configurar integração</DialogTitle>
            <DialogDescription>
              {selectedIntegration && `Configure sua integração com ${selectedIntegration.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedIntegration && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="bg-primary/10 w-10 h-10 rounded-md flex items-center justify-center text-primary">
                  {renderIntegrationIcon(selectedIntegration.type)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedIntegration.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedIntegration.description}</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="apiKey">Chave da API</Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Digite a chave da API"
                />
                <p className="text-xs text-muted-foreground">
                  Você pode encontrar sua chave da API no painel de desenvolvedores do {selectedIntegration.name}
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="webhookUrl">URL do Webhook</Label>
                <Input
                  id="webhookUrl"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://exemplo.com/webhook"
                />
                <p className="text-xs text-muted-foreground">
                  Configure esta URL no painel de desenvolvedor do {selectedIntegration.name} para receber atualizações em tempo real.
                </p>
              </div>
              
              <div className="space-y-2 p-3 border rounded-md bg-gray-50">
                <h4 className="text-sm font-medium">Permissões necessárias</h4>
                <ul className="space-y-1">
                  <li className="text-xs flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span>Leitura de dados de usuários</span>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span>Leitura de métricas</span>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span>Publicação de dados</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigIntegrationOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateIntegration}>
              Salvar configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para adicionar nova integração */}
      <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar nova integração</DialogTitle>
            <DialogDescription>
              Escolha entre as integrações disponíveis para adicionar ao seu CRM.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              {AVAILABLE_INTEGRATIONS.filter(i => !isIntegrationInstalled(i.id)).map(integration => (
                <Card key={integration.id} className="cursor-pointer hover:border-primary/50" onClick={() => {
                  handleAddIntegration(integration.id);
                  setIsAddIntegrationOpen(false);
                }}>
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center">
                        <img 
                          src={integration.icon} 
                          alt={integration.name}
                          className="rounded-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <CardTitle className="text-sm">{integration.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-0">
                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Componentes de ícones para integração
const Chart = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
};

const CreditCard = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
};

const Users = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

const Globe = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

export default Integracoes;
