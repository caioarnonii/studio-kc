import { LayoutDashboard, Users, Scissors, Calendar, UserCheck, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Clientes', url: '/clients', icon: Users },
  { title: 'Funcionárias', url: '/employees', icon: UserCheck },
  { title: 'Procedimentos', url: '/procedures', icon: Scissors },
  { title: 'Agendamentos', url: '/appointments', icon: Calendar },
];

interface AppSidebarProps {
  onLogout?: () => void;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        <div className="px-4 py-6">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-rose">
                <Scissors className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                Studio<span className="text-primary">KC</span>
              </h2>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-rose">
                <Scissors className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.url === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={item.url}
                        end={item.url === '/'}
                        className="hover:bg-accent transition-colors"
                        activeClassName="bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout at bottom */}
        <div className="mt-auto px-3 pb-4">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
