import { useEffect, useRef, useState } from 'react';
import { Chat, ContactMessage, Message, MessagePlatform } from "../../interfaces/chat/types";
import { chatMockData } from "../../data/mockChats";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import NoChatSelected from "../../components/chat/NoChatSelected";

/**
 * Componente principal da página de mensagens
 */
const Mensagens = () => {
  // Estado para controle de tabs e filtros
  const [activeTab, setActiveTab] = useState<MessagePlatform>('whatsapp');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'todas' | 'não lidas'>('todas');
  
  // Estado para chat selecionado e mensagens
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [audioMessages, setAudioMessages] = useState<{ [key: string]: boolean }>({});
  
  // Estados para controle de gravação de áudio
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Estados para popups e dialogs
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Estados para formulários
  const [locationDetails, setLocationDetails] = useState({
    name: '',
    latitude: 0,
    longitude: 0
  });
  
  const [contactDetails, setContactDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Filtra os chats baseado no termo de busca
  const filteredChats = chatMockData[activeTab].filter(
    (chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Funções de manipulação de eventos
  const handleTabChange = (value: string) => {
    setActiveTab(value as MessagePlatform);
    setSelectedChat(null);
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };
  
  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return;
    
    const newTextMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'text',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };
    
    updateChatWithNewMessage(newTextMessage, newMessage);
    setNewMessage('');
  };
  
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Aqui implementaria a lógica real de gravação de áudio
  };

  const stopRecording = () => {
    if (!selectedChat) return;
    
    setIsRecording(false);
    
    // Simulando envio de mensagem de áudio
    const newAudioMessage: Message = {
      id: `audio-${Date.now()}`,
      type: 'audio',
      audioUrl: '#',
      duration: `00:${recordingTime < 10 ? '0' : ''}${recordingTime}`,
      isPlaying: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };
    
    updateChatWithNewMessage(newAudioMessage, 'Áudio');
  };
  
  const sendLocation = () => {
    if (!selectedChat || !locationDetails.name) return;
    
    const newLocationMessage: Message = {
      id: `loc-${Date.now()}`,
      type: 'location',
      locationName: locationDetails.name,
      latitude: locationDetails.latitude,
      longitude: locationDetails.longitude,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };
    
    updateChatWithNewMessage(newLocationMessage, 'Localização');
    setShowLocationDialog(false);
    setLocationDetails({ name: '', latitude: 0, longitude: 0 });
  };

  const sendContact = () => {
    if (!selectedChat || !contactDetails.name || !contactDetails.phone) return;
    
    const newContactMessage: ContactMessage = {
      id: `contact-${Date.now()}`,
      type: 'contact',
      contactName: contactDetails.name,
      contactPhone: contactDetails.phone,
      contactEmail: contactDetails.email || undefined,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };
    
    updateChatWithNewMessage(newContactMessage, 'Contato');
    setShowContactDialog(false);
    setContactDetails({ name: '', phone: '', email: '' });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;
    
    // Verifica se é uma imagem
    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      
      const newImageMessage: Message = {
        id: `img-${Date.now()}`,
        type: 'image',
        imageUrl,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
        status: 'sent'
      };
      
      updateChatWithNewMessage(newImageMessage, 'Imagem');
    } else {
      // É um arquivo
      const newFileMessage: Message = {
        id: `file-${Date.now()}`,
        type: 'file',
        fileName: file.name,
        fileUrl: '#',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
        status: 'sent'
      };
      
      updateChatWithNewMessage(newFileMessage, 'Arquivo');
    }
    
    // Limpa o input de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Função genérica para atualizar o chat com uma nova mensagem de qualquer tipo
  const updateChatWithNewMessage = (newMessage: Message, lastMessagePreview: string) => {
    if (!selectedChat) return;
    
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: lastMessagePreview
    };
    
    setSelectedChat(updatedChat);
    
    // Atualiza o objeto no array de chats
    const updatedChatList = chatMockData[activeTab].map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    );
    
    chatMockData[activeTab] = updatedChatList;
  };
  
  const toggleAudioPlayback = (id: string) => {
    setAudioMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Aqui implementaria a lógica real de reprodução
  };
  
  // Efeito para rolagem automática para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);
  // Efeito para o timer da gravação de áudio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };  }, [isRecording]);  return (    <div className="h-[calc(100vh-5rem)] w-full flex flex-nowrap rounded-xl">
      {/* Sidebar com tabs de plataformas e lista de chats */}
      <div className="h-full w-auto flex-shrink-0">
        <ChatSidebar 
          chats={filteredChats}
          selectedChat={selectedChat}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onChatSelect={handleChatSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
      </div>

      {/* Área de chat */}
      {selectedChat ? (
        <ChatWindow 
          chat={selectedChat}
          activeTab={activeTab}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          isRecording={isRecording}
          recordingTime={recordingTime}
          startRecording={startRecording}
          stopRecording={stopRecording}
          showAttachmentOptions={showAttachmentOptions}
          setShowAttachmentOptions={setShowAttachmentOptions}
          showLocationDialog={showLocationDialog}
          setShowLocationDialog={setShowLocationDialog}
          showContactDialog={showContactDialog}
          setShowContactDialog={setShowContactDialog}
          locationDetails={locationDetails}
          setLocationDetails={setLocationDetails}
          contactDetails={contactDetails}
          setContactDetails={setContactDetails}
          sendLocation={sendLocation}
          sendContact={sendContact}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          audioMessages={audioMessages}
          toggleAudioPlayback={toggleAudioPlayback}
          messagesEndRef={messagesEndRef}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
        />
      ) : (
        <NoChatSelected 
          whatsappChatCount={chatMockData.whatsapp.length}
          instagramChatCount={chatMockData.instagram.length}
        />
      )}
      
      {/* Elemento de áudio oculto para reprodução */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Mensagens;
