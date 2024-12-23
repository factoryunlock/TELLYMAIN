import { format } from 'date-fns';
import { MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BroadcastSession } from '@/types/message';

interface BroadcastHistoryProps {
  broadcasts: BroadcastSession[];
}

export function BroadcastHistory({ broadcasts }: BroadcastHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partially_completed':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'partially_completed':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Broadcast ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Accounts</TableHead>
          <TableHead>Success Rate</TableHead>
          <TableHead>Rate Limits</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {broadcasts.map((broadcast) => {
          const totalAccounts = broadcast.selectedAccounts.length;
          const completedAccounts = broadcast.broadcasts.filter(
            (b) => b.status === 'completed'
          ).length;
          const rateLimitedAccounts = broadcast.broadcasts.filter(
            (b) => b.status === 'rate_limited'
          ).length;
          const successRate = (completedAccounts / totalAccounts) * 100;

          return (
            <TableRow key={broadcast.id}>
              <TableCell className="font-medium">{broadcast.id}</TableCell>
              <TableCell>{broadcast.name}</TableCell>
              <TableCell>{totalAccounts}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={successRate} className="w-[60px]" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round(successRate)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{rateLimitedAccounts}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(broadcast.status)}
                  <Badge variant={getStatusVariant(broadcast.status)}>
                    {broadcast.status.replace('_', ' ')}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {format(broadcast.createdAt, 'MMM d, yyyy HH:mm')}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}