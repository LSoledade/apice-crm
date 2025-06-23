import React from 'react';
import { ArrowLeft, Shield, FileText, Cookie, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Policies = () => {
  const handleBackToHome = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white">      {/* Header */}
      <header className="bg-[#303030] text-white py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/combinat_primário_claro.svg" 
                alt="Combinat" 
                className="h-8 w-auto flex-shrink-0"
              />
              <div>
                <h1 className="combinat-title-lg leading-none">Políticas e Termos</h1>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
              className="bg-transparent border-white/40 text-white hover:bg-white hover:text-[#303030] transition-all duration-200 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            {[
              { href: "#privacidade", icon: <Shield className="w-4 h-4" />, label: "Privacidade" },
              { href: "#termos", icon: <FileText className="w-4 h-4" />, label: "Termos de Uso" },
              { href: "#cookies", icon: <Cookie className="w-4 h-4" />, label: "Política de Cookies" }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#E9342E] transition-colors combinat-text font-medium"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Política de Privacidade */}
          <section id="privacidade" className="scroll-mt-24">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#E9342E]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#E9342E]" />
              </div>
              <h2 className="combinat-title-lg text-[#303030]">Política de Privacidade</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="combinat-text text-gray-600 mb-6">
                <strong>Última atualização:</strong> 23 de junho de 2025
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">1. Informações Gerais</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    A Combinat ("nós", "nosso" ou "empresa") está comprometida em proteger e respeitar sua privacidade. 
                    Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações 
                    quando você visita nosso site ou utiliza nossos serviços, em conformidade com a Lei Geral de Proteção 
                    de Dados (LGPD - Lei nº 13.709/2018).
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">2. Dados Coletados</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Coletamos os seguintes tipos de informações:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li><strong>Dados de identificação:</strong> nome, e-mail, telefone, empresa</li>
                    <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
                    <li><strong>Dados de comunicação:</strong> mensagens enviadas através de formulários de contato</li>
                    <li><strong>Dados de marketing:</strong> preferências de comunicação e interações com nosso conteúdo</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">3. Finalidade do Tratamento</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Utilizamos seus dados para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li>Prestação de serviços de marketing digital e desenvolvimento web</li>
                    <li>Comunicação sobre nossos produtos e serviços</li>
                    <li>Envio de newsletters e conteúdos relevantes</li>
                    <li>Melhoria da experiência do usuário em nosso site</li>
                    <li>Cumprimento de obrigações legais e regulamentares</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">4. Base Legal</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    O tratamento de seus dados pessoais é realizado com base no consentimento, execução de contrato, 
                    legítimo interesse e cumprimento de obrigação legal, conforme previsto na LGPD.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">5. Compartilhamento de Dados</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando 
                    necessário para prestação de serviços ou por determinação legal.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">6. Seus Direitos</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Conforme a LGPD, você tem direito a:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li>Confirmação da existência de tratamento</li>
                    <li>Acesso aos dados</li>
                    <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                    <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                    <li>Portabilidade dos dados</li>
                    <li>Eliminação dos dados tratados com base no consentimento</li>
                    <li>Revogação do consentimento</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">7. Contato do Encarregado (DPO)</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso 
                    Encarregado de Proteção de Dados através do e-mail: 
                    <a href="mailto:dpo@combinat.com.br" className="text-[#E9342E] hover:underline ml-1">
                      dpo@combinat.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Termos de Uso */}
          <section id="termos" className="scroll-mt-24">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#FF9334]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#FF9334]" />
              </div>
              <h2 className="combinat-title-lg text-[#303030]">Termos de Uso</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="combinat-text text-gray-600 mb-6">
                <strong>Última atualização:</strong> 23 de junho de 2025
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">1. Aceitação dos Termos</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Ao acessar e usar o site da Combinat, você concorda em cumprir e estar vinculado a estes 
                    Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">2. Uso do Site</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Você pode usar nosso site para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li>Acessar informações sobre nossos serviços</li>
                    <li>Entrar em contato conosco</li>
                    <li>Solicitar orçamentos e propostas</li>
                    <li>Inscrever-se em nossa newsletter</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">3. Restrições de Uso</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    É proibido usar nosso site para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li>Atividades ilegais ou não autorizadas</li>
                    <li>Transmitir vírus ou códigos maliciosos</li>
                    <li>Tentar obter acesso não autorizado a sistemas</li>
                    <li>Interferir no funcionamento do site</li>
                    <li>Violar direitos de propriedade intelectual</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">4. Propriedade Intelectual</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Todo o conteúdo do site, incluindo textos, imagens, logos, gráficos e software, é propriedade 
                    da Combinat e está protegido por direitos autorais e outras leis de propriedade intelectual.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">5. Limitação de Responsabilidade</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    A Combinat não se responsabiliza por danos diretos ou indiretos resultantes do uso ou 
                    incapacidade de usar o site, exceto nos casos previstos em lei.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">6. Modificações</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
                    em vigor imediatamente após a publicação no site.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">7. Lei Aplicável</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no 
                    foro da comarca de São Paulo, SP.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Política de Cookies */}
          <section id="cookies" className="scroll-mt-24">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="combinat-title-lg text-[#303030]">Política de Cookies</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="combinat-text text-gray-600 mb-6">
                <strong>Última atualização:</strong> 23 de junho de 2025
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">1. O que são Cookies</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita 
                    nosso site. Eles nos ajudam a melhorar sua experiência de navegação e entender como 
                    nosso site é utilizado.
                  </p>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">2. Tipos de Cookies Utilizados</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="combinat-subtitle-sm text-[#303030] mb-3">Cookies Essenciais</h4>
                      <p className="combinat-text text-gray-700">
                        Necessários para o funcionamento básico do site. Não podem ser desabilitados.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="combinat-subtitle-sm text-[#303030] mb-3">Cookies de Performance</h4>
                      <p className="combinat-text text-gray-700">
                        Coletam informações sobre como os visitantes usam o site, como páginas mais visitadas.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="combinat-subtitle-sm text-[#303030] mb-3">Cookies de Funcionalidade</h4>
                      <p className="combinat-text text-gray-700">
                        Permitem que o site lembre suas escolhas e forneça recursos aprimorados.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="combinat-subtitle-sm text-[#303030] mb-3">Cookies de Marketing</h4>
                      <p className="combinat-text text-gray-700">
                        Usados para rastrear visitantes em sites e exibir anúncios relevantes.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">3. Gerenciamento de Cookies</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Você pode controlar e gerenciar cookies das seguintes formas:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li>Através das configurações do seu navegador</li>
                    <li>Usando nossa central de preferências de cookies</li>
                    <li>Optando por não receber cookies de terceiros</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">4. Cookies de Terceiros</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed mb-4">
                    Utilizamos serviços de terceiros que podem definir cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 combinat-text text-gray-700">
                    <li><strong>Google Analytics:</strong> Para análise de tráfego do site</li>
                    <li><strong>Google Ads:</strong> Para remarketing e publicidade</li>
                    <li><strong>Facebook Pixel:</strong> Para rastreamento de conversões</li>
                  </ul>
                </div>

                <div>
                  <h3 className="combinat-subtitle-md text-[#303030] mb-4">5. Desabilitação de Cookies</h3>
                  <p className="combinat-text text-gray-700 leading-relaxed">
                    Você pode desabilitar cookies através das configurações do seu navegador. No entanto, 
                    isso pode afetar a funcionalidade de algumas partes do nosso site.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-[#E9342E]/5 to-[#FF9334]/5 rounded-2xl border border-[#E9342E]/10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E9342E]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#E9342E]" />
              </div>
            </div>
            <h3 className="combinat-subtitle-lg text-[#303030] mb-3">Dúvidas sobre nossas políticas?</h3>
            <p className="combinat-text text-gray-600 mb-6">
              Entre em contato conosco para esclarecimentos sobre privacidade, termos de uso ou cookies.
            </p>
            <Button className="bg-[#E9342E] hover:bg-[#E9342E]/90 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Entrar em Contato
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#303030] text-white py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="combinat-text text-white/60">
            © 2025 Combinat. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Policies;
