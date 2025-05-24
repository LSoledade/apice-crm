import { Chat, ChatData } from "../interfaces/chat/types";

// Dados simulados para demonstração
export const chatMockData: ChatData = {
  whatsapp: [
    {
      id: "wa-1",
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online",
      unread: 2,
      time: "09:42",
      lastMessage: "Confirmado para amanhã!",
      messages: [
        {
          id: "msg-1",
          type: "text",
          text: "Olá, tudo bem?",
          time: "09:30",
          sender: "João Silva",
          status: "read"
        },
        {
          id: "msg-2",
          type: "text",
          text: "Podemos marcar uma reunião amanhã?",
          time: "09:31",
          sender: "João Silva",
          status: "read"
        },
        {
          id: "msg-3",
          type: "text",
          text: "Claro, que horas seria bom para você?",
          time: "09:35",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-4",
          type: "text",
          text: "Por volta das 14h?",
          time: "09:40",
          sender: "João Silva",
          status: "read"
        },
        {
          id: "msg-5",
          type: "text",
          text: "Confirmado para amanhã!",
          time: "09:42",
          sender: "me",
          status: "delivered"
        }
      ]
    },
    {
      id: "wa-2",
      name: "Maria Oliveira",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "offline",
      unread: 0,
      time: "Ontem",
      lastMessage: "Obrigada pelas informações!",
      messages: [
        {
          id: "msg-6",
          type: "text",
          text: "Boa tarde, gostaria de mais informações sobre o serviço",
          time: "15:20",
          sender: "Maria Oliveira",
          status: "read"
        },
        {
          id: "msg-7",
          type: "text",
          text: "Claro, posso te enviar nosso catálogo completo.",
          time: "15:25",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-8",
          type: "file",
          fileName: "catalogo-servicos-2025.pdf",
          fileUrl: "#",
          fileSize: "2.4 MB",
          fileType: "PDF",
          time: "15:26",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-9",
          type: "text",
          text: "Obrigada pelas informações!",
          time: "15:45",
          sender: "Maria Oliveira",
          status: "read"
        }
      ]
    }
  ],
  instagram: [
    {
      id: "ig-1",
      name: "Carlos Mendes",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "online",
      unread: 3,
      time: "Agora",
      lastMessage: "Viu as novas fotos que postei?",
      messages: [
        {
          id: "msg-10",
          type: "text",
          text: "Ei, como vai?",
          time: "10:05",
          sender: "Carlos Mendes",
          status: "read"
        },
        {
          id: "msg-11",
          type: "text",
          text: "Tudo bem e você?",
          time: "10:10",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-12",
          type: "image",
          imageUrl: "https://picsum.photos/200/300",
          time: "10:12",
          sender: "Carlos Mendes",
          status: "read"
        },
        {
          id: "msg-13",
          type: "text",
          text: "O que achou dessa foto?",
          time: "10:12",
          sender: "Carlos Mendes",
          status: "read"
        },
        {
          id: "msg-14",
          type: "text",
          text: "Muito legal!",
          time: "10:15",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-15",
          type: "text",
          text: "Viu as novas fotos que postei?",
          time: "10:30",
          sender: "Carlos Mendes",
          status: "delivered"
        }
      ]
    },
    {
      id: "ig-2",
      name: "Ana Sousa",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "offline",
      unread: 0,
      time: "09:15",
      lastMessage: "Adorei o design novo!",
      messages: [
        {
          id: "msg-16",
          type: "text",
          text: "Bom dia! Vi o novo design do site.",
          time: "09:10",
          sender: "Ana Sousa",
          status: "read"
        },
        {
          id: "msg-17",
          type: "text",
          text: "O que achou? Fizemos algumas melhorias recentes.",
          time: "09:12",
          sender: "me",
          status: "read"
        },
        {
          id: "msg-18",
          type: "text",
          text: "Adorei o design novo!",
          time: "09:15",
          sender: "Ana Sousa",
          status: "read"
        }
      ]
    }
  ]
};
