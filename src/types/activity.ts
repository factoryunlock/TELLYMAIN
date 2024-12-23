export type ActivityStatus = 'success' | 'warning' | 'error' | 'info';
export type ActivityType = 'message_sent' | 'rate_limit' | 'proxy_change';

export interface ActivityLog {
  id: number;
  type: ActivityType;
  description: string;
  timestamp: Date;
  status: ActivityStatus;
}