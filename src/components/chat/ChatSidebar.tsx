import { Filter, PlusCircle, Search } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Chat, MessagePlatform } from "../../interfaces/chat/types";
import ChatListItem from "./ChatListItem";
import { Image, MessageSquare } from "lucide-react";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  activeTab: MessagePlatform;
  onTabChange: (value: string) => void;
  onChatSelect: (chat: Chat) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: 'todas' | 'não lidas';
  onFilterChange: (filter: 'todas' | 'não lidas') => void;
}

/**
 * Componente da sidebar com lista de chats
 */
const ChatSidebar = ({ 
  chats,
  selectedChat,
  activeTab,
  onTabChange,
  onChatSelect,
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange
}: ChatSidebarProps) => {
  return (    <div className="w-80 border-r flex flex-col bg-white h-full">
      <div className="p-3 border-b flex-shrink-0">
        <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whatsapp" className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Image className="h-4 w-4" />
              <span>Instagram</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
        <div className="p-3 border-b flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Conversas</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Nova</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-56 p-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Iniciar nova conversa</h4>
                <Input placeholder="Nome ou número do contato" />
                <Button size="sm" className="w-full">Iniciar chat</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar conversas"
            className="pl-8 rounded-full border-gray-200"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1 items-center">
            <Badge 
              variant="outline" 
              className={`${filterType === 'todas' 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : 'bg-gray-50 text-gray-700 border-gray-200'} 
                hover:bg-blue-100 cursor-pointer`}
              onClick={() => onFilterChange('todas')}
            >
              Todas
            </Badge>
            <Badge 
              variant="outline"
              className={`${filterType === 'não lidas' 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : 'bg-gray-50 text-gray-700 border-gray-200'} 
                hover:bg-blue-100 cursor-pointer`}
              onClick={() => onFilterChange('não lidas')}
            >
              Não lidas
            </Badge>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Filter className="h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-56 p-3">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Filtros</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="filter-date" className="mr-2" />
                    <label htmlFor="filter-date" className="text-sm">Data</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="filter-arquivados" className="mr-2" />
                    <label htmlFor="filter-arquivados" className="text-sm">Arquivados</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="filter-grupos" className="mr-2" />
                    <label htmlFor="filter-grupos" className="text-sm">Grupos</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" size="sm">Limpar</Button>
                  <Button size="sm">Aplicar</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>      </div>
      
      <ScrollArea className="flex-1 min-h-0">
        <div className="py-1 px-2">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <ChatListItem 
                key={chat.id} 
                chat={chat} 
                isSelected={selectedChat?.id === chat.id}
                activeTab={activeTab as MessagePlatform}
                onSelect={onChatSelect}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
              <Search className="h-8 w-8 text-gray-300 mb-2" />
              <p>Nenhuma conversa encontrada</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
