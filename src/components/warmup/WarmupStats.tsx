import { Card } from '@/components/ui/card';
import { Account } from '@/types/account';

interface WarmupStatsProps {
  accounts: Account[];
  autoWarmupAccounts: Account[];
}

export function WarmupStats({ accounts, autoWarmupAccounts }: WarmupStatsProps) {
  const averageHealthScore = Math.round(
    [...autoWarmupAccounts].reduce(
      (acc, curr) => acc + curr.healthScore,
      0
    ) / (autoWarmupAccounts.length || 1)
  );

  return (
    <Card className="p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-sm text-muted-foreground">Active Warmups</div>
          <div className="text-2xl font-bold">
            {autoWarmupAccounts.length}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Average Health Score</div>
          <div className="text-2xl font-bold">
            {averageHealthScore}%
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Messages Sent Today</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
    </Card>
  );
}