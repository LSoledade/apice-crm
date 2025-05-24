import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Chat, Message } from "../../interfaces/chat/types";
import MessageContentRenderer from "./MessageContentRenderer";
import { MessageStatusIcon } from "./MessageStatusIcon";
import { ForwardedRef, forwardRef } from "react";

interface MessageListProps {
  chat: Chat;
  audioMessages: { [key: string]: boolean };
  onToggleAudioPlayback: (id: string) => void;
  onImageClick: (url: string) => void;
}

/**
 * Componente que renderiza a lista de mensagens
 */
const MessageList = forwardRef(({ 
  chat, 
  audioMessages, 
  onToggleAudioPlayback, 
  onImageClick 
}: MessageListProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col space-y-2 p-3">
        {chat.messages.length > 0 && (
          <div className="flex justify-center mb-2">
            <Badge variant="outline" className="bg-gray-50 text-gray-500 px-2 py-1 text-xs">
              {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
            </Badge>
          </div>
        )}
        
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender !== 'me' && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
              <div
              className={`max-w-[70%] rounded-lg p-2 break-words ${
                message.sender === 'me'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 shadow-sm'
              }`}
            >
              <MessageContentRenderer
                message={message}
                audioMessages={audioMessages}
                onToggleAudioPlayback={onToggleAudioPlayback}
                onImageClick={onImageClick}
              />
              
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className={`text-xs ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.time}
                </span>
                {message.sender === 'me' && <MessageStatusIcon status={message.status} />}
              </div>
            </div>
          </div>
        ))}
          {chat.messages.length > 0 && (
          <div className="flex justify-center mt-2">
            <Badge variant="outline" className="bg-gray-50 text-gray-500 px-2 py-1 text-xs">
              Fim da conversa
            </Badge>
          </div>
        )}
        
        {/* Referência para rolar para o final das mensagens */}
        <div ref={ref} />
      </div>
    </ScrollArea>
  );
});

MessageList.displayName = "MessageList";

export default MessageList;
