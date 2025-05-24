// Tipos básicos de mensagens
export interface BaseMessage {
  id: string;
  time: string;
  sender: 'me' | string;
  status: 'sent' | 'delivered' | 'read' | 'pending';
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  text: string;
}

export interface ImageMessage extends BaseMessage {
  type: 'image';
  imageUrl: string;
}

export interface FileMessage extends BaseMessage {
  type: 'file';
  fileName: string;
  fileUrl: string;
  fileSize?: string;
  fileType?: string;
}

export interface AudioMessage extends BaseMessage {
  type: 'audio';
  audioUrl: string;
  duration: string;
  isPlaying: boolean;
}

export interface LocationMessage extends BaseMessage {
  type: 'location';
  latitude: number;
  longitude: number;
  locationName: string;
}

export interface ContactMessage extends BaseMessage {
  type: 'contact';
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
}

// Tipo união para mensagens
export type Message = 
  | TextMessage 
  | ImageMessage 
  | FileMessage 
  | AudioMessage 
  | LocationMessage 
  | ContactMessage;

// Interface para chats
export interface Chat {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  unread: number;
  time: string;
  lastMessage: string;
  messages: Message[];
}

// Plataformas de mensagens suportadas
export type MessagePlatform = 'whatsapp' | 'instagram';

// Tipo para dados de chat por plataforma
export interface ChatData {
  [key: string]: Chat[];
}

// Tipos para localização
export interface LocationDetails {
  name: string;
  latitude: number;
  longitude: number;
}

// Tipos para contatos
export interface ContactDetails {
  name: string;
  phone: string;
  email: string;
}
