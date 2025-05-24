import { Play, Square } from "lucide-react";
import { AudioMessage } from "../../interfaces/chat/types";

interface AudioMessageBubbleProps {
  message: AudioMessage;
  isPlaying: boolean;
  onTogglePlayback: (id: string) => void;
}

/**
 * Componente que renderiza uma mensagem de áudio
 */
const AudioMessageBubble = ({ message, isPlaying, onTogglePlayback }: AudioMessageBubbleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onTogglePlayback(message.id)}
        className={`h-8 w-8 rounded-full flex items-center justify-center ${
          isPlaying ? 'bg-red-500 text-white' : 'bg-gray-200'
        }`}
      >
        {isPlaying ? (
          <Square className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5 ml-0.5" />
        )}
      </button>
      
      <div className="flex-1">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isPlaying ? 'bg-blue-500' : 'bg-gray-400'}`} 
            style={{ width: isPlaying ? '60%' : '0%' }}
          ></div>
        </div>
        <span className="text-xs">{message.duration}</span>
      </div>
    </div>
  );
};

export default AudioMessageBubble;
