import { Chat, MessagePlatform } from "../../interfaces/chat/types";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ContactDialog from "./ContactDialog";
import LocationDialog from "./LocationDialog";
import ImagePreviewDialog from "./ImagePreviewDialog";

interface ChatWindowProps {
  chat: Chat;
  activeTab: MessagePlatform;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  recordingTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  showAttachmentOptions: boolean;
  setShowAttachmentOptions: (show: boolean) => void;
  showLocationDialog: boolean;
  setShowLocationDialog: (show: boolean) => void;
  showContactDialog: boolean;
  setShowContactDialog: (show: boolean) => void;
  locationDetails: { name: string; latitude: number; longitude: number };
  setLocationDetails: React.Dispatch<React.SetStateAction<{ name: string; latitude: number; longitude: number }>>;
  contactDetails: { name: string; phone: string; email: string };
  setContactDetails: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string }>>;
  sendLocation: () => void;
  sendContact: () => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  audioMessages: { [key: string]: boolean };
  toggleAudioPlayback: (id: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Componente de janela de chat
 */
const ChatWindow = ({
  chat,
  activeTab,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isRecording,
  recordingTime,
  startRecording,
  stopRecording,
  showAttachmentOptions,
  setShowAttachmentOptions,
  showLocationDialog,
  setShowLocationDialog,
  showContactDialog,
  setShowContactDialog,
  locationDetails,
  setLocationDetails,
  contactDetails,
  setContactDetails,
  sendLocation,
  sendContact,
  imagePreview,
  setImagePreview,
  audioMessages,
  toggleAudioPlayback,
  messagesEndRef,
  fileInputRef,
  handleFileUpload
}: ChatWindowProps) => {
  return (    <div className="flex-1 flex flex-col h-full relative">
      <div className="flex-shrink-0 bg-white">
        <ChatHeader chat={chat} activeTab={activeTab} />
      </div>
        <div className="flex-1 min-h-0">
        <MessageList
          chat={chat}
          audioMessages={audioMessages}
          onToggleAudioPlayback={toggleAudioPlayback}
          onImageClick={setImagePreview}
          ref={messagesEndRef}
        />
      </div>
      
      <div className="flex-shrink-0 bg-white border-t shadow-sm">
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          isRecording={isRecording}
          recordingTime={recordingTime}
          startRecording={startRecording}
          stopRecording={stopRecording}
          showAttachmentOptions={showAttachmentOptions}
          setShowAttachmentOptions={setShowAttachmentOptions}
          setShowLocationDialog={setShowLocationDialog}
          setShowContactDialog={setShowContactDialog}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
        />
      </div>
      
      {/* Dialogs */}
      <LocationDialog
        isOpen={showLocationDialog}
        onClose={() => setShowLocationDialog(false)}
        onSend={sendLocation}
        locationDetails={locationDetails}
        setLocationDetails={setLocationDetails}
      />
      
      <ContactDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        onSend={sendContact}
        contactDetails={contactDetails}
        setContactDetails={setContactDetails}
      />
      
      <ImagePreviewDialog
        imageUrl={imagePreview}
        onClose={() => setImagePreview(null)}
      />
    </div>
  );
};

export default ChatWindow;
