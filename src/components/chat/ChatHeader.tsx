import { ArchiveIcon, Info, MoreVertical, Phone, Search, Tag, Trash2, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Separator } from "../../components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { Chat, MessagePlatform } from "../../interfaces/chat/types";
import { HelpCircle, Settings } from "lucide-react";

interface ChatHeaderProps {
  chat: Chat;
  activeTab: MessagePlatform;
}

/**
 * Componente que renderiza o cabeçalho da janela de chat
 */
const ChatHeader = ({ chat, activeTab }: ChatHeaderProps) => {  return (
    <div className="bg-white">
      <div className="p-2 border-b flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9 mr-2 cursor-pointer">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback className={
                    activeTab === 'whatsapp' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }>
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver perfil</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <h3 className="font-medium">{chat.name}</h3>
            <p className="text-xs flex items-center">
              {chat.status === 'online' ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  <span className="text-green-600">Online</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300 mr-1.5"></span>
                  <span className="text-gray-500">Offline</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <Phone className="h-5 w-5 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chamada de voz</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <Video className="h-5 w-5 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chamada de vídeo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <Search className="h-5 w-5 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buscar na conversa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-52">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Informações do contato
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Tag className="h-4 w-4 mr-2" />
                  Marcar como importante
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <ArchiveIcon className="h-4 w-4 mr-2" />
                  Arquivar conversa
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start text-sm text-red-600" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Apagar conversa
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
        {/* Barra de ferramentas adicional */}
      <div className="flex items-center justify-between px-3 py-0.5 bg-gray-50 border-b text-xs">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
            <Tag className="h-3 w-3 mr-1" />
            Marcar
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
            <HelpCircle className="h-3 w-3 mr-1" />
            Ajuda
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-blue-600">
          <Settings className="h-3 w-3 mr-1" />
          Automações
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
