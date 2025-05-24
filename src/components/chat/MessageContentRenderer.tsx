import { Message } from "../../interfaces/chat/types";
import AudioMessageBubble from "./AudioMessageBubble";
import ContactMessageBubble from "./ContactMessageBubble";
import FileMessageBubble from "./FileMessageBubble";
import ImageMessageBubble from "./ImageMessageBubble";
import LocationMessageBubble from "./LocationMessageBubble";
import TextMessageBubble from "./TextMessageBubble";

interface MessageContentRendererProps {
  message: Message;
  audioMessages: { [key: string]: boolean };
  onToggleAudioPlayback: (id: string) => void;
  onImageClick: (url: string) => void;
}

/**
 * Componente que renderiza o conteúdo específico de cada tipo de mensagem
 */
const MessageContentRenderer = ({ 
  message, 
  audioMessages, 
  onToggleAudioPlayback,
  onImageClick
}: MessageContentRendererProps) => {
  switch (message.type) {
    case 'text':
      return <TextMessageBubble message={message} />;
      
    case 'image':
      return <ImageMessageBubble message={message} onImageClick={onImageClick} />;
      
    case 'file':
      return <FileMessageBubble message={message} />;
      
    case 'audio':
      return (
        <AudioMessageBubble 
          message={message} 
          isPlaying={!!audioMessages[message.id]} 
          onTogglePlayback={onToggleAudioPlayback}
        />
      );
      
    case 'location':
      return <LocationMessageBubble message={message} />;
      
    case 'contact':
      return <ContactMessageBubble message={message} />;
      
    default:
      return null;
  }
};

export default MessageContentRenderer;
