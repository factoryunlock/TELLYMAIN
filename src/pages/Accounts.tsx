import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Account } from '@/types/account';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useToast } from '@/hooks/use-toast';
import { AccountActions } from '@/components/accounts/AccountActions';
import { AccountEditDialog } from '@/components/accounts/AccountEditDialog';
import { MOCK_ACCOUNTS } from '@/lib/constants';

export function Accounts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [healthFilter, setHealthFilter] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredAccounts = MOCK_ACCOUNTS.filter((account) => {
    const matchesSearch = account.username
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || account.status === statusFilter;
    const matchesHealth =
      healthFilter === 'all' ||
      (healthFilter === 'high' && account.healthScore >= 80) ||
      (healthFilter === 'medium' &&
        account.healthScore >= 50 &&
        account.healthScore < 80) ||
      (healthFilter === 'low' && account.healthScore < 50);

    return matchesSearch && matchesStatus && matchesHealth;
  });

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({
      title: 'Account Deleted',
      description: 'The account has been successfully deleted.',
    });
  };

  const handleSave = (id: string, data: any) => {
    toast({
      title: 'Account Updated',
      description: 'The account has been successfully updated.',
    });
  };

  const handleRowClick = (account: Account) => {
    navigate(`/accounts/${account.id}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">
            Manage and monitor your Telegram accounts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="limited">Limited</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={healthFilter} onValueChange={setHealthFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by health" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Health Scores</SelectItem>
            <SelectItem value="high">High (80-100)</SelectItem>
            <SelectItem value="medium">Medium (50-79)</SelectItem>
            <SelectItem value="low">Low (0-49)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Proxy</TableHead>
              <TableHead>Account Age</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow
                key={account.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(account)}
              >
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
                  <Badge
                    variant={account.status === 'active' ? 'default' : 'destructive'}
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {account.proxy ? (
                    <Badge variant="secondary">Active</Badge>
                  ) : (
                    <Badge variant="outline">No Proxy</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(account.accountAge, 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {account.lastActive
                    ? format(account.lastActive, 'MMM d, yyyy')
                    : 'Never'}
                </TableCell>
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <AccountActions
                    account={account}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AccountEditDialog
        account={selectedAccount}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}