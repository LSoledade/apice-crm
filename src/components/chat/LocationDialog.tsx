import { Map } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { LocationDetails } from "../../interfaces/chat/types";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  locationDetails: LocationDetails;
  setLocationDetails: React.Dispatch<React.SetStateAction<LocationDetails>>;
}

/**
 * Componente de diálogo para envio de localização
 */
const LocationDialog = ({
  isOpen,
  onClose,
  onSend,
  locationDetails,
  setLocationDetails
}: LocationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartilhar Localização</DialogTitle>
          <DialogDescription>
            Digite os detalhes da localização que deseja compartilhar
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-100 h-[150px] rounded-lg flex items-center justify-center mb-2">
            <Map className="h-10 w-10 text-gray-400" />
          </div>
          
          <Input
            placeholder="Nome do local"
            value={locationDetails.name}
            onChange={(e) => setLocationDetails({...locationDetails, name: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Latitude"
              type="number"
              value={locationDetails.latitude || ''}
              onChange={(e) => setLocationDetails({
                ...locationDetails, 
                latitude: parseFloat(e.target.value) || 0
              })}
            />
            <Input
              placeholder="Longitude"
              type="number"
              value={locationDetails.longitude || ''}
              onChange={(e) => setLocationDetails({
                ...locationDetails, 
                longitude: parseFloat(e.target.value) || 0
              })}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSend} disabled={!locationDetails.name}>
            Enviar Localização
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
