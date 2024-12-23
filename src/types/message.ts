export interface MessageBroadcast {
  id: string;
  accountId: string;
  messagesSent: number;
  rateLimitHit: boolean;
  messagesBeforeLimit: number | null;
  startTime: Date;
  endTime: Date | null;
  status: 'running' | 'completed' | 'rate_limited' | 'failed';
}

export interface BroadcastSession {
  id: string;
  name: string;
  message: string;
  selectedAccounts: string[];
  broadcasts: MessageBroadcast[];
  createdAt: Date;
  completedAt: Date | null;
  status: 'running' | 'completed' | 'partially_completed' | 'failed';
}