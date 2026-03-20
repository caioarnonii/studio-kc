import { Users, Scissors, Calendar, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getDashboard } from "@/api/dashboardService";

export default function Dashboard() {

  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      label: "Clientes",
      value: dashboardData?.totalClients ?? 0,
      href: "/clients",
      icon: Users,
      color: "from-pink-400 to-rose-400"
    },
    {
      label: "Funcionárias",
      value: dashboardData?.totalEmployees ?? 0,
      href: "/employees",
      icon: UserCheck,
      color: "from-purple-400 to-pink-400"
    },
    {
      label: "Procedimentos",
      value: dashboardData?.totalProcedures ?? 0,
      href: "/procedures",
      icon: Scissors,
      color: "from-amber-400 to-orange-400"
    },
    {
      label: "Agendamentos",
      value: dashboardData?.totalAppointments ?? 0,
      href: "/appointments",
      icon: Calendar,
      color: "from-blue-400 to-indigo-400"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Bem-vindo ao <span className="text-primary">Studio KC</span>
        </h2>
        <p className="text-muted-foreground mt-1">
          Visão geral do seu salão de beleza.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link to={stat.href} key={stat.label} className="group">
            <Card className="shadow-card hover:shadow-rose transition-shadow duration-300 border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-rose`}>
                  <stat.icon className="h-4 w-4 text-primary-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="shadow-card border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base">
            Próximos Agendamentos
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          {dashboardData?.nextAppointments?.length > 0 ? (
            dashboardData.nextAppointments.map((appointment: any) => (
              <div
                key={appointment.id}
                className="flex justify-between items-center border-b border-border pb-2"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {appointment.client}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.procedure} • {appointment.employee}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground">
                  {new Date(appointment.date).toLocaleDateString("pt-BR")}{" "}
                  {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum agendamento próximo.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}