'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Mail, 
  User, 
  Building, 
  MessageSquare, 
  Send, 
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Form validation types
interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  area: string;
  funcionarios: string;
  solucoes: string;
  comoConheceu: string;
  consultoriaExterna: 'sim' | 'nao' | '';
  mensagem: string;
}

interface FormErrors {
  [key: string]: string;
}

const AREAS_ATUACAO = [
  'Tecnologia e Software',
  'Serviços Profissionais',
  'Comércio e Varejo',
  'Indústria e Manufatura',
  'Saúde e Bem-estar',
  'Educação',
  'Financeiro e Contabilidade',
  'Marketing e Comunicação',
  'Construção e Imobiliário',
  'Alimentação e Bebidas',
  'Outro'
];

const NUMERO_FUNCIONARIOS = [
  '1-5 funcionários',
  '6-20 funcionários',
  '21-50 funcionários',
  '51-100 funcionários',
  'Mais de 100 funcionários'
];

const SOLUCOES_BUSCA = [
  'CRM para organizar clientes',
  'Automação de vendas',
  'Gestão de leads',
  'Relatórios e análises',
  'Integração com WhatsApp',
  'Controle financeiro',
  'Gestão de equipe',
  'Ainda não sei, quero conversar'
];

const COMO_CONHECEU = [
  'Google',
  'Redes sociais',
  'Indicação de conhecido',
  'YouTube',
  'LinkedIn',
  'Site ou blog',
  'Evento',
  'Outro'
];

function CombinatContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cargo: '',
    area: '',
    funcionarios: '',
    solucoes: '',
    comoConheceu: '',
    consultoriaExterna: '',
    mensagem: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Digite um email válido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (!formData.empresa.trim()) {
      newErrors.empresa = 'Nome da empresa é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cargo: '',
      area: '',
      funcionarios: '',
      solucoes: '',
      comoConheceu: '',
      consultoriaExterna: '',
      mensagem: ''
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-700 font-medium">
                    Nome*
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className={cn(
                        "pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        errors.nome && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                  </div>
                  {errors.nome && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-sm text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.nome}
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email corporativo*
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={cn(
                        "pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                  </div>
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-sm text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Telefone e Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-700 font-medium">
                    Telefone*
                  </Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                      <span className="text-sm">🇧🇷</span>
                    </div>
                    <Input
                      id="telefone"
                      type="tel"
                      placeholder="+55"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      className={cn(
                        "rounded-l-none border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        errors.telefone && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                  </div>
                  {errors.telefone && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-sm text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.telefone}
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-gray-700 font-medium">
                    Empresa*
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="empresa"
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => handleInputChange('empresa', e.target.value)}
                      className={cn(
                        "pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500",
                        errors.empresa && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                  </div>
                  {errors.empresa && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-sm text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.empresa}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Cargo e Área */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Cargo*</Label>
                  <Select value={formData.cargo} onValueChange={(value) => handleInputChange('cargo', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO/Proprietário</SelectItem>
                      <SelectItem value="diretor">Diretor</SelectItem>
                      <SelectItem value="gerente">Gerente</SelectItem>
                      <SelectItem value="coordenador">Coordenador</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Área*</Label>
                  <Select value={formData.area} onValueChange={(value) => handleInputChange('area', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {AREAS_ATUACAO.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Funcionários e Soluções */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Número de funcionários</Label>
                  <Select value={formData.funcionarios} onValueChange={(value) => handleInputChange('funcionarios', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {NUMERO_FUNCIONARIOS.map((num) => (
                        <SelectItem key={num} value={num}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Busco soluções para*</Label>
                  <Select value={formData.solucoes} onValueChange={(value) => handleInputChange('solucoes', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOLUCOES_BUSCA.map((solucao) => (
                        <SelectItem key={solucao} value={solucao}>{solucao}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Como conheceu */}              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Como conheceu a Combinat?</Label>
                <Select value={formData.comoConheceu} onValueChange={(value) => handleInputChange('comoConheceu', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMO_CONHECEU.map((opcao) => (
                      <SelectItem key={opcao} value={opcao}>{opcao}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-gray-700 font-medium">Mensagem*</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="mensagem"
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange('mensagem', e.target.value)}
                    className="pl-10 resize-none border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Consultoria Externa */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">
                  Você contrata consultoria externa ou alocação de profissionais para projetos de tecnologia?*
                </Label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultoriaExterna"
                      value="sim"
                      checked={formData.consultoriaExterna === 'sim'}
                      onChange={(e) => handleInputChange('consultoriaExterna', e.target.value)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    Sim
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultoriaExterna"
                      value="nao"
                      checked={formData.consultoriaExterna === 'nao'}
                      onChange={(e) => handleInputChange('consultoriaExterna', e.target.value)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    Não
                  </label>
                </div>
              </div>

              {/* Política de Privacidade */}              <div className="text-sm text-gray-600">
                Ao informar meus dados, eu aceito receber comunicados e concordo com a{' '}
                <a href="/politica-privacidade" className="text-orange-600 hover:underline font-medium">
                  Política de Privacidade
                </a>
                .
              </div>

              {/* Botão de Envio */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      ENVIAR
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-gray-500 text-center">
                Prometemos não utilizar suas informações de contato para enviar qualquer tipo de SPAM
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-8"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Mensagem Enviada!</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Obrigado por entrar em contato. Nossa equipe entrará em contato em breve para conversar sobre suas necessidades.
            </p>
            <Button
              onClick={resetForm}
              variant="outline"
              className="group border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Enviar Nova Mensagem
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CombinatContactForm;
