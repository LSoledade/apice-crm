import { MapPin } from "lucide-react";
import { LocationMessage } from "../../interfaces/chat/types";

interface LocationMessageBubbleProps {
  message: LocationMessage;
}

/**
 * Componente que renderiza uma mensagem de localização
 */
const LocationMessageBubble = ({ message }: LocationMessageBubbleProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 items-center">
        <MapPin className="h-4 w-4" />
        <span className="font-medium">{message.locationName}</span>
      </div>
      <div className="bg-gray-100 relative h-24 rounded overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-blue-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-1 text-xs">
          Latitude: {message.latitude.toFixed(6)}, Longitude: {message.longitude.toFixed(6)}
        </div>
      </div>
    </div>
  );
};

export default LocationMessageBubble;
