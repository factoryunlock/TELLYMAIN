import { format } from 'date-fns';
import { MessageSquare, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageBroadcast } from '@/types/message';

interface BroadcastDetailsProps {
  broadcast: MessageBroadcast;
  username: string;
}

export function BroadcastDetails({ broadcast, username }: BroadcastDetailsProps) {
  const duration = broadcast.endTime
    ? (broadcast.endTime.getTime() - broadcast.startTime.getTime()) / 1000 / 60
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{username}</h3>
        <Badge
          variant={broadcast.rateLimitHit ? 'destructive' : 'default'}
        >
          {broadcast.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{broadcast.messagesSent}</div>
            {broadcast.messagesBeforeLimit && (
              <p className="text-xs text-muted-foreground">
                Rate limit after {broadcast.messagesBeforeLimit} messages
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Limited</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {broadcast.rateLimitHit ? 'Yes' : 'No'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(duration)} min
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Start Time:</span>
            <span>{format(broadcast.startTime, 'MMM d, yyyy HH:mm:ss')}</span>
          </div>
          {broadcast.endTime && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">End Time:</span>
              <span>{format(broadcast.endTime, 'MMM d, yyyy HH:mm:ss')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}