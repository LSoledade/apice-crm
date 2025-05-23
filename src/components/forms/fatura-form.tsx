import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, Plus, Trash } from 'lucide-react';

// Schema de validação com Zod
const faturaItemSchema = z.object({
  descricao: z.string().min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  quantidade: z.number().positive({ message: 'Quantidade deve ser maior que 0' }),
  valorUnitario: z.number().positive({ message: 'Valor deve ser maior que 0' })
});

const faturaSchema = z.object({
  cliente: z.object({
    nome: z.string().min(3, { message: 'Nome do cliente é obrigatório (mínimo 3 caracteres)' }),
    email: z.string().email({ message: 'E-mail inválido' })
  }),
  dataEmissao: z.date({ required_error: 'Data de emissão é obrigatória' }),
  dataVencimento: z.date({ required_error: 'Data de vencimento é obrigatória' }),
  metodo: z.string().min(1, { message: 'Método de pagamento é obrigatório' }),
  recorrente: z.boolean().default(false),
  items: z.array(faturaItemSchema).min(1, { message: 'Adicione pelo menos um item' }),
  observacoes: z.string().optional()
});

type FaturaFormData = z.infer<typeof faturaSchema>;

interface FaturaFormProps {
  onSubmit: (data: FaturaFormData) => void;
  onCancel: () => void;
  faturaExistente?: any; // Opcional para edição de uma fatura existente
}

const FaturaForm: React.FC<FaturaFormProps> = ({ onSubmit, onCancel, faturaExistente }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inicializar o formulário
  const form = useForm<FaturaFormData>({
    resolver: zodResolver(faturaSchema),
    defaultValues: faturaExistente || {
      cliente: {
        nome: '',
        email: ''
      },
      dataEmissao: new Date(),
      dataVencimento: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 dias a partir de hoje
      metodo: '',
      recorrente: false,
      items: [{ descricao: '', quantidade: 1, valorUnitario: 0 }],
      observacoes: ''
    }
  });
  
  // Configurar array field para os itens da fatura
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });
  
  // Calcular o valor total da fatura
  const calcularTotal = () => {
    const items = form.getValues().items;
    return items.reduce((total, item) => {
      return total + (item.quantidade * item.valorUnitario);
    }, 0);
  };
  
  // Handler para submissão do formulário
  const handleSubmit = async (data: FaturaFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Erro ao salvar a fatura:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações do Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cliente.nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do cliente" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cliente.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail do Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@exemplo.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações da Fatura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dataEmissao"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Emissão</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy', { locale: pt })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dataVencimento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Vencimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy', { locale: pt })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={pt}
                        disabled={(date) => date < form.getValues().dataEmissao}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="metodo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de Pagamento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um método de pagamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Boleto">Boleto</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="Transferência Bancária">Transferência Bancária</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="recorrente"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Fatura Recorrente</FormLabel>
                  <FormDescription>
                    Marque se esta fatura será gerada automaticamente todo mês.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Itens da Fatura</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => append({ descricao: '', quantidade: 1, valorUnitario: 0 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-end border p-4 rounded-md">
                <div className="col-span-12 md:col-span-5">
                  <FormField
                    control={form.control}
                    name={`items.${index}.descricao`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Descrição do item" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-5 md:col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantidade`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            min="1" 
                            step="1" 
                            onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-5 md:col-span-3">
                  <FormField
                    control={form.control}
                    name={`items.${index}.valorUnitario`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Unitário (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            min="0" 
                            step="0.01" 
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => fields.length > 1 && remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-600">Total da Fatura:</div>
              <div className="text-lg font-bold">
                {calcularTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Informações adicionais sobre esta fatura" 
                  rows={3} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : faturaExistente ? 'Atualizar Fatura' : 'Criar Fatura'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FaturaForm;
