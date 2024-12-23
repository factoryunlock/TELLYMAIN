import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Account } from '@/types/account';

interface DragDropConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  action: 'start' | 'stop';
  onConfirm: () => void;
}

export function DragDropConfirmDialog({
  open,
  onOpenChange,
  account,
  action,
  onConfirm,
}: DragDropConfirmDialogProps) {
  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'start' ? 'Start Warmup' : 'Stop Warmup'}
          </DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to {action === 'start' ? 'start' : 'stop'} warmup for{' '}
          <span className="font-semibold">{account.username}</span>?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={action === 'stop' ? 'destructive' : 'default'}
            onClick={onConfirm}
          >
            {action === 'start' ? 'Start Warmup' : 'Stop Warmup'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}