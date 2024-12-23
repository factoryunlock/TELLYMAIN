import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Activity,
  MessageSquare,
  Shield,
  AlertTriangle,
  Clock,
  Send,
} from 'lucide-react';
import { Account } from '@/types/account';
import { ActivityType } from '@/types/activity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountEditForm } from '@/components/accounts/AccountEditForm';
import { ApiSection } from '@/components/accounts/ApiSection';
import { useToast } from '@/hooks/use-toast';
import { MOCK_ACCOUNTS } from '@/lib/constants';
import { MOCK_ACTIVITY_LOG } from '@/lib/mock-data/activity-log';

export function AccountDetail() {
  const { id } = useParams();
  const account = MOCK_ACCOUNTS.find(a => a.id === id);
  const { toast } = useToast();

  if (!account) {
    return <div>Account not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'message_sent': return Send;
      case 'rate_limit': return AlertTriangle;
      case 'proxy_change': return Shield;
      default: return Activity;
    }
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{account.username}</h1>
          {account.nickname && (
            <p className="text-muted-foreground">{account.nickname}</p>
          )}
        </div>
        <Badge
          variant={account.status === 'active' ? 'default' : 'destructive'}
          className="text-sm"
        >
          {account.status}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Progress value={account.healthScore} className="w-[60px]" />
              <span className="text-2xl font-bold">{account.healthScore}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Limits Hit</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Age</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(account.accountAge, 'MMM d, yyyy')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Account Details</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountEditForm account={account} />
              <div className="mt-6">
                <ApiSection
                  accountId={account.id}
                  apiId={account.apiId}
                  apiHash={account.apiHash}
                  onUpdate={(data) => {
                    toast({
                      title: 'API Details Updated',
                      description: 'The API configuration has been saved.',
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ACTIVITY_LOG.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 rounded-lg border p-4"
                    >
                      <Icon className={`h-5 w-5 ${getStatusColor(activity.status)}`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(activity.timestamp, 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Message Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                Analytics coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}