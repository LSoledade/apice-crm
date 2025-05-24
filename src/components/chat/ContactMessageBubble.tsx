import { User } from "lucide-react";
import { ContactMessage } from "../../interfaces/chat/types";

interface ContactMessageBubbleProps {
  message: ContactMessage;
}

/**
 * Componente que renderiza uma mensagem de contato
 */
const ContactMessageBubble = ({ message }: ContactMessageBubbleProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 items-center">
        <User className="h-4 w-4" />
        <span className="font-medium">Contato</span>
      </div>
      <div className="bg-white/20 rounded-md p-2">
        <div className="flex items-center mb-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">{message.contactName}</p>
            <p className="text-xs">{message.contactPhone}</p>
          </div>
        </div>
        {message.contactEmail && (
          <p className="text-xs mt-1">Email: {message.contactEmail}</p>
        )}
      </div>
    </div>
  );
};

export default ContactMessageBubble;
