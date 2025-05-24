import { User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { ContactDetails } from "../../interfaces/chat/types";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  contactDetails: ContactDetails;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
}

/**
 * Componente de diálogo para envio de contato
 */
const ContactDialog = ({
  isOpen,
  onClose,
  onSend,
  contactDetails,
  setContactDetails
}: ContactDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartilhar Contato</DialogTitle>
          <DialogDescription>
            Digite os detalhes do contato que deseja compartilhar
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          
          <Input
            placeholder="Nome do contato"
            value={contactDetails.name}
            onChange={(e) => setContactDetails({...contactDetails, name: e.target.value})}
          />
          
          <Input
            placeholder="Telefone"
            value={contactDetails.phone}
            onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
          />
          
          <Input
            placeholder="Email (opcional)"
            value={contactDetails.email}
            onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={onSend} 
            disabled={!contactDetails.name || !contactDetails.phone}
          >
            Enviar Contato
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
