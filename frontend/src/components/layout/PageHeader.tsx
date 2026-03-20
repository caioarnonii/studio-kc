import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/clients': 'Clientes',
  '/clients/new': 'Novo Cliente',
  '/procedures': 'Procedimentos',
  '/procedures/new': 'Novo Procedimento',
  '/appointments': 'Agendamentos',
  '/appointments/new': 'Novo Agendamento',
  '/employees': 'Funcionárias',
  '/employees/new': 'Nova Funcionária',
};

function getTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith('/clients/edit')) return 'Editar Cliente';
  if (pathname.startsWith('/procedures/edit')) return 'Editar Procedimento';
  if (pathname.startsWith('/appointments/edit')) return 'Editar Agendamento';
  if (pathname.startsWith('/employees/edit')) return 'Editar Funcionária';
  return 'Dashboard';
}

export function PageHeader() {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className="h-14 flex items-center gap-3 border-b border-border bg-card px-6">
      <SidebarTrigger />
      <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-primary-glow" />
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    </header>
  );
}
