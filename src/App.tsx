import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Messages } from '@/pages/Messages';
import { Accounts } from '@/pages/Accounts';
import { AccountDetail } from '@/pages/AccountDetail';
import { Warmup } from '@/pages/Warmup';
import { Settings } from '@/pages/Settings';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <div className="hidden w-64 border-r md:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/:id" element={<AccountDetail />} />
              <Route path="/warmup" element={<Warmup />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}