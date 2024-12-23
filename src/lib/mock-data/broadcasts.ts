import { BroadcastSession, MessageBroadcast } from '@/types/message';

export const MOCK_BROADCASTS: BroadcastSession[] = [
  {
    id: 'broadcast-1',
    name: 'Marketing Campaign 1',
    message: 'Hello! Check out our latest products...',
    selectedAccounts: ['1', '2', '3'],
    broadcasts: [
      {
        id: 'msg-1',
        accountId: '1',
        messagesSent: 15,
        rateLimitHit: true,
        messagesBeforeLimit: 15,
        startTime: new Date(2024, 2, 15, 10, 0),
        endTime: new Date(2024, 2, 15, 10, 15),
        status: 'rate_limited'
      },
      {
        id: 'msg-2',
        accountId: '2',
        messagesSent: 8,
        rateLimitHit: true,
        messagesBeforeLimit: 8,
        startTime: new Date(2024, 2, 15, 10, 0),
        endTime: new Date(2024, 2, 15, 10, 10),
        status: 'rate_limited'
      },
      {
        id: 'msg-3',
        accountId: '3',
        messagesSent: 20,
        rateLimitHit: false,
        messagesBeforeLimit: null,
        startTime: new Date(2024, 2, 15, 10, 0),
        endTime: new Date(2024, 2, 15, 10, 30),
        status: 'completed'
      }
    ],
    createdAt: new Date(2024, 2, 15, 10, 0),
    completedAt: new Date(2024, 2, 15, 10, 30),
    status: 'partially_completed'
  }
];