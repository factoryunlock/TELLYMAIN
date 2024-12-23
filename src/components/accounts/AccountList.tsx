import { useState } from 'react';
import { Edit2, Trash2, Zap } from 'lucide-react';
import { Account } from '@/types/account';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
  onWarmup: (id: string) => void;
}

export function AccountList({ accounts, onEdit, onDelete, onWarmup }: AccountListProps) {
  const { toast } = useToast();
  const [warmingUp, setWarmingUp] = useState<string[]>([]);

  const handleWarmup = async (id: string) => {
    setWarmingUp((prev) => [...prev, id]);
    await onWarmup(id);
    setWarmingUp((prev) => prev.filter((wId) => wId !== id));
    toast({
      title: 'Warmup Started',
      description: 'Account warmup process has been initiated.',
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Health Score</TableHead>
            <TableHead>Proxy Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.username}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={account.healthScore} className="w-[60px]" />
                  <span className="text-sm text-muted-foreground">
                    {account.healthScore}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {account.proxy ? (
                  <Badge variant="secondary">Active</Badge>
                ) : (
                  <Badge variant="destructive">No Proxy</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(account)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(account.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleWarmup(account.id)}
                    disabled={warmingUp.includes(account.id)}
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}