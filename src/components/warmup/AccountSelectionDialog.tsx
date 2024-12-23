import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AccountSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountCount: number;
  onConfirm: () => void;
}

export function AccountSelectionDialog({
  open,
  onOpenChange,
  accountCount,
  onConfirm,
}: AccountSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Account Transfer</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to move {accountCount} account{accountCount !== 1 ? 's' : ''} to Auto Warmup?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}