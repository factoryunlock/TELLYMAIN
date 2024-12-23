import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiConnectionDialog } from './ApiConnectionDialog';

interface ApiSectionProps {
  accountId: string;
  apiId?: string;
  apiHash?: string;
  onUpdate: (data: { apiId: string; apiHash: string }) => void;
}

export function ApiSection({ accountId, apiId, apiHash, onUpdate }: ApiSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localApiId, setLocalApiId] = useState(apiId || '');
  const [localApiHash, setLocalApiHash] = useState(apiHash || '');

  const handleSave = () => {
    onUpdate({ apiId: localApiId, apiHash: localApiHash });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">API Configuration</h3>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="apiId">API ID</Label>
          <Input
            id="apiId"
            value={localApiId}
            onChange={(e) => setLocalApiId(e.target.value)}
            placeholder="Enter API ID"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="apiHash">API Hash</Label>
          <Input
            id="apiHash"
            value={localApiHash}
            onChange={(e) => setLocalApiHash(e.target.value)}
            placeholder="Enter API Hash"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save API Details
          </Button>
          <Button 
            variant="secondary"
            onClick={() => setIsDialogOpen(true)}
            className="flex-1"
          >
            <Terminal className="mr-2 h-4 w-4" />
            Connect to Telegram
          </Button>
        </div>
      </div>

      <ApiConnectionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        accountId={accountId}
      />
    </div>
  );
}