import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface MessageStatusIconProps {
  status: 'sent' | 'delivered' | 'read' | 'pending';
}

/**
 * Componente que renderiza o ícone de status da mensagem
 */
export const MessageStatusIcon = ({ status }: MessageStatusIconProps) => {
  switch (status) {
    case 'read':
      return <CheckCircle2 className="h-3 w-3 text-blue-500" />;
    case 'delivered':
      return <CheckCircle2 className="h-3 w-3 text-gray-400" />;
    case 'sent':
      return <Clock className="h-3 w-3 text-gray-400" />;
    default:
      return <AlertCircle className="h-3 w-3 text-yellow-500" />;
  }
};
