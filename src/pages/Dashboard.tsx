import {
  Activity,
  MessageSquare,
  Shield,
  Users,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AccountsChart } from '@/components/dashboard/AccountsChart';
import { AccountList } from '@/components/accounts/AccountList';
import { useAccounts } from '@/hooks/useAccounts';

export function Dashboard() {
  const { accounts, updateAccount, deleteAccount, warmupAccount } = useAccounts();

  const stats = {
    totalAccounts: accounts.length,
    messagesSent: 2345,
    averageHealth: Math.round(
      accounts.reduce((acc, curr) => acc + curr.healthScore, 0) / accounts.length
    ),
    activeProxies: accounts.filter((a) => a.proxy).length,
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Telegram accounts and activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Accounts"
          value={stats.totalAccounts}
          icon={Users}
          description="Active Telegram accounts"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Messages Sent"
          value={stats.messagesSent.toLocaleString()}
          icon={MessageSquare}
          description="Last 30 days"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Average Health"
          value={`${stats.averageHealth}%`}
          icon={Activity}
          description="Across all accounts"
        />
        <StatsCard
          title="Active Proxies"
          value={stats.activeProxies}
          icon={Shield}
          description={`Of ${stats.totalAccounts} total accounts`}
        />
      </div>

      <AccountsChart />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recent Accounts</h2>
            <p className="text-muted-foreground">
              Your most recently added Telegram accounts.
            </p>
          </div>
        </div>
        <AccountList
          accounts={accounts}
          onEdit={updateAccount}
          onDelete={deleteAccount}
          onWarmup={warmupAccount}
        />
      </div>
    </div>
  );
}