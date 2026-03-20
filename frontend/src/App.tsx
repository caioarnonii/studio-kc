import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ClientList from "@/pages/clients/ClientList";
import ClientForm from "@/pages/clients/ClientForm";
import ProcedureList from "@/pages/procedures/ProcedureList";
import ProcedureForm from "@/pages/procedures/ProcedureForm";
import AppointmentList from "@/pages/appointments/AppointmentList";
import AppointmentForm from "@/pages/appointments/AppointmentForm";
import EmployeeList from "@/pages/employees/EmployeeList";
import EmployeeForm from "@/pages/employees/EmployeeForm";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <Routes>
      <Route element={<MainLayout onLogout={logout} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} />
        <Route path="/clients/edit/:id" element={<ClientForm />} />
        <Route path="/procedures" element={<ProcedureList />} />
        <Route path="/procedures/new" element={<ProcedureForm />} />
        <Route path="/procedures/edit/:id" element={<ProcedureForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/new" element={<AppointmentForm />} />
        <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
