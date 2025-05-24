import { MessageSquare, Image } from "lucide-react";
import { Button } from "../../components/ui/button";

interface NoChatSelectedProps {
  whatsappChatCount: number;
  instagramChatCount: number;
}

/**
 * Componente exibido quando nenhum chat está selecionado
 */
const NoChatSelected = ({ whatsappChatCount, instagramChatCount }: NoChatSelectedProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col text-center bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-md w-full">
        <div className="bg-blue-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">Central de Mensagens</h3>
        <p className="text-gray-500 mb-4 text-sm">
          Selecione uma conversa à esquerda ou inicie uma nova para começar a interagir com seus contatos.
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div className="border p-3 rounded-lg bg-gray-50 flex flex-col items-center justify-center hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer">
            <div className="bg-green-50 rounded-full h-8 w-8 flex items-center justify-center mb-1">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <p className="font-medium">WhatsApp</p>
            <p className="text-xs text-gray-500">{whatsappChatCount} conversas</p>          </div>
          
          <div className="border p-3 rounded-lg bg-gray-50 flex flex-col items-center justify-center hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer">
            <div className="bg-purple-50 rounded-full h-8 w-8 flex items-center justify-center mb-1">
              <Image className="h-4 w-4 text-purple-600" />
            </div>
            <p className="font-medium">Instagram</p>
            <p className="text-xs text-gray-500">{instagramChatCount} conversas</p>
          </div>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2 text-sm">Integração com API</h4>
          <p className="text-xs text-gray-500 mb-3">
            Conecte suas contas oficiais do WhatsApp e Instagram para gerenciar todas as suas conversas diretamente desta interface.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Configurar integrações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
