import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Chat, MessagePlatform } from "../../interfaces/chat/types";

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  activeTab: MessagePlatform;
  onSelect: (chat: Chat) => void;
}

/**
 * Componente que renderiza um item da lista de chats
 */
const ChatListItem = ({ chat, isSelected, activeTab, onSelect }: ChatListItemProps) => {
  return (    <div
      className={`flex items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected 
          ? activeTab === 'whatsapp' 
            ? 'bg-green-50 border-l-4 border-green-500' 
            : 'bg-purple-50 border-l-4 border-purple-500'
          : ''
      }`}
      onClick={() => onSelect(chat)}
    >
      <div className="relative">
        <Avatar className={`h-9 w-9 ${chat.unread > 0 ? 'ring-2 ring-blue-400' : ''}`}>
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback className={
            activeTab === 'whatsapp' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-purple-100 text-purple-700'
          }>
            {chat.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span 
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
            chat.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className={`font-medium text-sm ${chat.unread > 0 ? 'text-black' : ''}`}>
            {chat.name}
          </span>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <p className={`text-xs ${chat.unread > 0 ? 'text-black font-medium' : 'text-gray-500'} truncate`}>
          {chat.lastMessage}
        </p>
      </div>
      {chat.unread > 0 && (
        <Badge variant={activeTab === 'whatsapp' ? 'default' : 'secondary'} className={`ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center ${
          activeTab === 'whatsapp' ? 'bg-green-500' : 'bg-purple-500'
        }`}>
          {chat.unread}
        </Badge>
      )}
    </div>
  );
};

export default ChatListItem;
