import { TextMessage } from "../../interfaces/chat/types";

interface TextMessageBubbleProps {
  message: TextMessage;
}

/**
 * Componente que renderiza uma mensagem de texto
 */
const TextMessageBubble = ({ message }: TextMessageBubbleProps) => {
  return (
    <div className="whitespace-pre-wrap">
      {message.text}
    </div>
  );
};

export default TextMessageBubble;
