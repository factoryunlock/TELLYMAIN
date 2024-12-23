import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StopWarmupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountCount: number;
  onConfirm: () => void;
}

export function StopWarmupDialog({
  open,
  onOpenChange,
  accountCount,
  onConfirm,
}: StopWarmupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stop Warmup Process</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to stop the warmup process for {accountCount} account{accountCount !== 1 ? 's' : ''}?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Stop Warmup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}