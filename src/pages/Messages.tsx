import { useState } from 'react';
import { Send, History } from 'lucide-react';
import { Account } from '@/types/account';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BroadcastHistory } from '@/components/broadcasts/BroadcastHistory';
import { MOCK_ACCOUNTS } from '@/lib/constants';
import { MOCK_BROADCASTS } from '@/lib/mock-data/broadcasts';

export function Messages() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const sortedAccounts = [...MOCK_ACCOUNTS].sort((a, b) => b.healthScore - a.healthScore);

  const handleSend = async () => {
    const broadcastId = `broadcast-${Date.now()}`;
    toast({
      title: 'Starting Broadcast',
      description: `Broadcast ID: ${broadcastId}`,
    });

    for (let i = 0; i < selectedAccounts.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Progress',
        description: `Sent ${i + 1} of ${selectedAccounts.length} messages`,
      });
    }

    toast({
      title: 'Broadcast Complete',
      description: `Successfully completed broadcast ${broadcastId}`,
    });

    setMessage('');
    setSelectedAccounts([]);
  };

  return (
    <div className="container py-6">
      <Tabs defaultValue="new" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new">New Broadcast</TabsTrigger>
          <TabsTrigger value="history">Broadcast History</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="mx-auto max-w-4xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold">New Broadcast</h1>
              <p className="text-muted-foreground">
                Send messages to multiple accounts at once
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-4">
                <h2 className="mb-4 text-lg font-semibold">Available Accounts</h2>
                <div className="space-y-4">
                  {sortedAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{account.username}</span>
                          <Badge
                            variant={account.status === 'active' ? 'default' : 'destructive'}
                          >
                            {account.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={account.healthScore} className="w-[60px]" />
                          <span className="text-sm text-muted-foreground">
                            {account.healthScore}%
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setSelectedAccounts((prev) =>
                            prev.includes(account.id)
                              ? prev.filter((id) => id !== account.id)
                              : [...prev, account.id]
                          )
                        }
                      >
                        {selectedAccounts.includes(account.id) ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h2 className="mb-4 text-lg font-semibold">Broadcast Message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Selected Accounts ({selectedAccounts.length})
                    </label>
                    <div className="rounded-lg border bg-muted p-2">
                      {selectedAccounts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No accounts selected
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {selectedAccounts.map((id) => {
                            const account = sortedAccounts.find((a) => a.id === id);
                            return (
                              account && (
                                <Badge key={id} variant="secondary">
                                  {account.username}
                                </Badge>
                              )
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message Content
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[200px]"
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSend}
                    disabled={!selectedAccounts.length || !message}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Broadcast ({selectedAccounts.length} accounts)
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Broadcast History</h1>
              <p className="text-muted-foreground">
                View past broadcasts and their results
              </p>
            </div>
            <Card>
              <BroadcastHistory broadcasts={MOCK_BROADCASTS} />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}