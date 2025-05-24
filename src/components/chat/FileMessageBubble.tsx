import { File } from "lucide-react";
import { FileMessage } from "../../interfaces/chat/types";

interface FileMessageBubbleProps {
  message: FileMessage;
}

/**
 * Componente que renderiza uma mensagem de arquivo
 */
const FileMessageBubble = ({ message }: FileMessageBubbleProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center bg-white/20 p-2 rounded">
        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
          <File className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{message.fileName}</p>
          <div className="flex items-center text-xs">
            {message.fileSize && <span className="mr-2">{message.fileSize}</span>}
            {message.fileType && <span className="bg-gray-200 text-gray-700 px-1.5 rounded text-[10px]">{message.fileType}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileMessageBubble;
