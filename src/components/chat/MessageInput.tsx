import { Camera, Contact, File, Image, Map, Mic, Paperclip, Send, Smile } from "lucide-react";
import { useRef } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { formatAudioTime } from "../../utils/chat/formatters";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  recordingTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  setShowAttachmentOptions: (show: boolean) => void;
  showAttachmentOptions: boolean;
  setShowLocationDialog: (show: boolean) => void;
  setShowContactDialog: (show: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Componente de input para envio de mensagens
 */
const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  isRecording,
  recordingTime,
  startRecording,
  stopRecording,
  setShowAttachmentOptions,
  showAttachmentOptions,
  setShowLocationDialog,
  setShowContactDialog,
  fileInputRef,
  handleFileUpload
}: MessageInputProps) => {  return (
    <div className="p-4 bg-white flex items-center gap-2 mx-auto w-full max-w-[95%]">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileUpload}
        accept="image/*,application/pdf,application/msword,application/vnd.ms-excel,text/plain"
      />
      
      <Popover open={showAttachmentOptions} onOpenChange={setShowAttachmentOptions}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" side="top">
          <div className="grid grid-cols-3 gap-1">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center justify-center h-20 w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-blue-100 p-2 rounded-full mb-1">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs">Foto</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex flex-col items-center justify-center h-20 w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-purple-100 p-2 rounded-full mb-1">
                <File className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs">Documento</span>
            </Button>
            
            <Button 
              variant="ghost"
              className="flex flex-col items-center justify-center h-20 w-full"
              onClick={() => {
                setShowLocationDialog(true);
                setShowAttachmentOptions(false);
              }}
            >
              <div className="bg-green-100 p-2 rounded-full mb-1">
                <Map className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs">Localização</span>
            </Button>
            
            <Button 
              variant="ghost"
              className="flex flex-col items-center justify-center h-20 w-full"
              onClick={() => {
                setShowContactDialog(true);
                setShowAttachmentOptions(false);
              }}
            >
              <div className="bg-yellow-100 p-2 rounded-full mb-1">
                <Contact className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-xs">Contato</span>
            </Button>
            
            <Button 
              variant="ghost"
              className="flex flex-col items-center justify-center h-20 w-full"
            >
              <div className="bg-red-100 p-2 rounded-full mb-1">
                <Camera className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xs">Câmera</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {!isRecording ? (
        <>
          <div className="relative flex-1">
            <Input
              placeholder="Digite sua mensagem..."
              className="pr-10 rounded-full border-gray-200"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 hover:bg-gray-100"
                >
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Emojis</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {['😊', '😂', '❤️', '👍', '🎉', '🔥', '👀', '✅'].map(emoji => (
                      <Button 
                        key={emoji} 
                        variant="ghost"
                        className="h-8 w-8 p-0" 
                        onClick={() => setNewMessage(prev => prev + emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {newMessage.trim() ? (
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              variant="default"
              className="rounded-full h-10 w-10 bg-blue-500 hover:bg-blue-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              onClick={startRecording}
              size="icon"
              variant="default"
              className="rounded-full h-10 w-10 bg-blue-500 hover:bg-blue-600"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-center flex-1 space-x-2">
          <div className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-full text-sm flex items-center">
            <span className="mr-2">{formatAudioTime(recordingTime)}</span>
            <span className="animate-pulse h-2 w-2 bg-red-600 rounded-full"></span>
          </div>
          <Button
            onClick={stopRecording}
            size="icon"
            variant="destructive"
            className="rounded-full h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
