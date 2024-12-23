import { useState } from 'react';
import { Account, AccountFormData } from '@/types/account';
import { MOCK_ACCOUNTS } from '@/lib/constants';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);

  const addAccount = (data: AccountFormData) => {
    const newAccount: Account = {
      id: Math.random().toString(36).slice(2),
      username: data.username || '',
      healthScore: 100,
      proxy: data.proxy,
      accountAge: new Date(),
      lastActive: new Date(),
      status: 'active'
    };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const updateAccount = (id: string, data: AccountFormData) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, ...data } : account
      )
    );
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const warmupAccount = async (id: string, type: 'Auto Warmup' | 'Manual Warmup') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? { 
              ...account, 
              status: type,
              healthScore: Math.min(100, account.healthScore + 10) 
            }
          : account
      )
    );
  };

  const removeFromWarmup = async (id: string) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? { 
              ...account, 
              status: 'active'
            }
          : account
      )
    );
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    warmupAccount,
    removeFromWarmup
  };
}