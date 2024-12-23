import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Account } from '@/types/account';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  nickname: z.string().optional(),
  proxy: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AccountEditFormProps {
  account: Account;
}

export function AccountEditForm({ account }: AccountEditFormProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: account.nickname || '',
      proxy: account.proxy || '',
    },
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: 'Account Updated',
      description: 'The account has been successfully updated.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              value={account.username}
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
              value={account.phoneNumber || 'Not provided'}
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

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}