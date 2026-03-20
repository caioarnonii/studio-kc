import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { PageHeader } from './PageHeader';

interface MainLayoutProps {
  onLogout?: () => void;
}

export function MainLayout({ onLogout }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <PageHeader />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
