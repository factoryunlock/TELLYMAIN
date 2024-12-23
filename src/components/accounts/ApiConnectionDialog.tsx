import { useState } from 'react';
import { Terminal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ApiConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: string;
}

export function ApiConnectionDialog({ open, onOpenChange, accountId }: ApiConnectionDialogProps) {
  const [progress, setProgress] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [awaitingCode, setAwaitingCode] = useState(false);

  const handleConnect = async () => {
    setProgress(0);
    setConsoleOutput([]);
    setAwaitingCode(false);

    // Simulate connection process
    setConsoleOutput(prev => [...prev, '> Initializing connection...']);
    setProgress(20);
    await new Promise(r => setTimeout(r, 1000));
    
    setConsoleOutput(prev => [...prev, '> Connecting to Telegram...']);
    setProgress(40);
    await new Promise(r => setTimeout(r, 1000));
    
    setConsoleOutput(prev => [...prev, '> Please check your Telegram app for verification code']);
    setProgress(60);
    setAwaitingCode(true);
  };

  const handleSubmitCode = async () => {
    setConsoleOutput(prev => [...prev, `> Submitting verification code: ${verificationCode}`]);
    setProgress(80);
    await new Promise(r => setTimeout(r, 1000));
    
    setConsoleOutput(prev => [...prev, '> Connection successful!']);
    setProgress(100);
    await new Promise(r => setTimeout(r, 1000));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect to Telegram API</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          
          <div className="bg-muted rounded-lg p-4 h-[200px] overflow-auto font-mono text-sm">
            {consoleOutput.map((line, i) => (
              <div key={i} className="text-muted-foreground">
                {line}
              </div>
            ))}
          </div>

          {awaitingCode && (
            <div className="space-y-2">
              <Input
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button 
                onClick={handleSubmitCode}
                disabled={!verificationCode}
                className="w-full"
              >
                Submit Code
              </Button>
            </div>
          )}

          {!awaitingCode && (
            <Button onClick={handleConnect} className="w-full">
              <Terminal className="mr-2 h-4 w-4" />
              Start Connection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}