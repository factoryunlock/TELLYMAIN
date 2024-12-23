import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Account } from '@/types/account';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  nickname: z.string().optional(),
  proxy: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AccountEditDialogProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: FormData) => void;
}

export function AccountEditDialog({
  account,
  open,
  onOpenChange,
  onSave,
}: AccountEditDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: account?.nickname || '',
      proxy: account?.proxy || '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (account) {
      onSave(account.id, data);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={account?.username || ''}
                  disabled
                  className="bg-background"
                />
                <FormDescription>
                  Username cannot be changed
                </FormDescription>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  value={account?.phoneNumber || 'Not provided'}
                  disabled
                  className="bg-background"
                />
                <FormDescription>
                  Phone number cannot be changed
                </FormDescription>
              </div>
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a nickname" />
                  </FormControl>
                  <FormDescription>
                    A friendly name to identify this account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proxy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proxy</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter proxy address" />
                  </FormControl>
                  <FormDescription>
                    The proxy server used for this account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}