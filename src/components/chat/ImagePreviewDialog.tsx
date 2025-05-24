import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";

interface ImagePreviewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

/**
 * Componente de diálogo para visualização de imagens
 */
const ImagePreviewDialog = ({ imageUrl, onClose }: ImagePreviewDialogProps) => {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Visualizar Imagem</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Visualização da imagem" 
              className="max-w-full max-h-[500px]"
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
