import { Image as ImageIcon } from "lucide-react";
import { ImageMessage } from "../../interfaces/chat/types";

interface ImageMessageBubbleProps {
  message: ImageMessage;
  onImageClick: (url: string) => void;
}

/**
 * Componente que renderiza uma mensagem de imagem
 */
const ImageMessageBubble = ({ message, onImageClick }: ImageMessageBubbleProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <img 
        src={message.imageUrl} 
        alt="Imagem enviada" 
        className="max-w-full rounded max-h-60 cursor-pointer"
        onClick={() => onImageClick(message.imageUrl)}
      />
    </div>
  );
};

export default ImageMessageBubble;
