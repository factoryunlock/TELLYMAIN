export interface Account {
  id: string;
  username: string;
  nickname?: string;
  healthScore: number;
  proxy?: string;
  phoneNumber?: string;
  accountAge: Date;
  lastActive?: Date;
  status: 'active' | 'banned' | 'limited' | 'Auto Warmup' | 'Manual Warmup';
  apiId?: string;
  apiHash?: string;
}

export interface AccountFormData {
  nickname?: string;
  proxy?: string;
  apiId?: string;
  apiHash?: string;
}

export interface MessageBroadcast {
  id: string;
  message: string;
  selectedAccounts: string[];
  status: 'pending' | 'sending' | 'completed' | 'failed';
  createdAt: Date;
}