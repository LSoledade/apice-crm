import React from 'react';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GeneralSettings } from '@/interfaces/ConfigSettings';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const LANGUAGES = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español (España)' },
];

const TIME_ZONES = [
  { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
  { value: 'America/New_York', label: 'New York (GMT-5/GMT-4)' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+1/GMT+2)' },
  { value: 'UTC', label: 'UTC' },
];

const DATE_FORMATS = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const ConfiguracoesGerais = () => {
  const { register, handleSubmit, formState: { errors, isDirty }, setValue, watch } = useForm<GeneralSettings>({
    defaultValues: {
      companyName: 'Ápice CRM',
      logoUrl: '',
      primaryColor: '#0F766E',
      secondaryColor: '#5EEAD4',
      defaultLanguage: 'pt-BR',
      timeZone: 'America/Sao_Paulo',
      dateFormat: 'DD/MM/YYYY',
      emailNotifications: true
    }
  });

  const onSubmit = (data: GeneralSettings) => {
    console.log('Dados a serem salvos:', data);
    
    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: "Configurações salvas",
        description: "Suas alterações foram salvas com sucesso.",
      });
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações Gerais</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu CRM.</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="aparencia">Aparência</TabsTrigger>
          <TabsTrigger value="preferencias">Preferências</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <TabsContent value="empresa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Empresa</CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua empresa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input 
                      id="companyName" 
                      {...register('companyName', { required: "Nome da empresa é obrigatório" })}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500">{errors.companyName.message}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="logoUrl">URL do Logo</Label>
                    <Input 
                      id="logoUrl" 
                      {...register('logoUrl')}
                      placeholder="https://exemplo.com/logo.png"
                    />
                    {watch('logoUrl') && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <img 
                          src={watch('logoUrl')} 
                          alt="Logo Preview" 
                          className="h-12 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="aparencia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalize sua marca</CardTitle>
                <CardDescription>
                  Configure as cores e aparência do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">Cor primária</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        id="primaryColor" 
                        type="color"
                        className="w-12 h-10 p-1"
                        {...register('primaryColor')}
                      />
                      <Input 
                        type="text"
                        value={watch('primaryColor')}
                        onChange={(e) => setValue('primaryColor', e.target.value, { shouldDirty: true })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">Cor secundária</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        id="secondaryColor" 
                        type="color"
                        className="w-12 h-10 p-1"
                        {...register('secondaryColor')}
                      />
                      <Input 
                        type="text"
                        value={watch('secondaryColor')}
                        onChange={(e) => setValue('secondaryColor', e.target.value, { shouldDirty: true })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="flex gap-2">
                    <div 
                      className="w-full h-16 rounded-md flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: watch('primaryColor') }}
                    >
                      Cor Primária
                    </div>
                    <div 
                      className="w-full h-16 rounded-md flex items-center justify-center text-gray-700 font-bold"
                      style={{ backgroundColor: watch('secondaryColor') }}
                    >
                      Cor Secundária
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferencias" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências Regionais</CardTitle>
                <CardDescription>
                  Configure o idioma e formato de exibição de dados.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="defaultLanguage">Idioma padrão</Label>
                    <Select 
                      defaultValue={watch('defaultLanguage')}
                      onValueChange={(value) => setValue('defaultLanguage', value, { shouldDirty: true })}
                    >
                      <SelectTrigger id="defaultLanguage" className="w-full">
                        <SelectValue placeholder="Selecione um idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(language => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="timeZone">Fuso horário</Label>
                    <Select 
                      defaultValue={watch('timeZone')}
                      onValueChange={(value) => setValue('timeZone', value, { shouldDirty: true })}
                    >
                      <SelectTrigger id="timeZone" className="w-full">
                        <SelectValue placeholder="Selecione um fuso horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_ZONES.map(tz => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="dateFormat">Formato de data</Label>
                    <Select 
                      defaultValue={watch('dateFormat')}
                      onValueChange={(value) => setValue('dateFormat', value, { shouldDirty: true })}
                    >
                      <SelectTrigger id="dateFormat" className="w-full">
                        <SelectValue placeholder="Selecione um formato" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_FORMATS.map(format => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="emailNotifications" className="text-base">
                      Notificações por e-mail
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={watch('emailNotifications')}
                      onCheckedChange={(checked) => setValue('emailNotifications', checked, { shouldDirty: true })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Cancelar</Button>
            <Button type="submit" disabled={!isDirty}>Salvar alterações</Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesGerais;
