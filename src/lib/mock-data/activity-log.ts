import { ActivityLog } from '@/types/activity';

export const MOCK_ACTIVITY_LOG: ActivityLog[] = [
  { 
    id: 1,
    type: 'message_sent',
    description: 'Message sent to @user123',
    timestamp: new Date(2024, 2, 15, 14, 30),
    status: 'success'
  },
  {
    id: 2,
    type: 'rate_limit',
    description: 'Rate limit reached - Cooling down',
    timestamp: new Date(2024, 2, 15, 14, 45),
    status: 'warning'
  },
  {
    id: 3,
    type: 'proxy_change',
    description: 'Proxy updated to proxy2.example.com',
    timestamp: new Date(2024, 2, 15, 15, 0),
    status: 'info'
  }
];