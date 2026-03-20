import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getDashboard = async (req: Request, res: Response) => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const [
      totalClients,
      totalEmployees,
      totalProcedures,
      totalAppointments,
      nextAppointmentsRaw
    ] = await prisma.$transaction([

      prisma.user.count({
        where: { role: "CLIENT" }
      }),

      prisma.user.count({
        where: { role: "EMPLOYEE" }
      }),

      prisma.procedure.count(),

      prisma.appointment.count(),

      prisma.appointment.findMany({
        where: {
          date: {
            gte: today
          }
        },
        include: {
          client: true,
          employee: true,
          procedure: true
        },
        orderBy: {
          date: "asc"
        },
        take: 5
      })
    ]);

    const nextAppointments = nextAppointmentsRaw.map((appointment) => ({
      id: appointment.id,
      date: appointment.date,
      client: appointment.client.name,
      employee: appointment.employee.name,
      procedure: appointment.procedure.name
    }));

    res.json({
      totalClients,
      totalEmployees,
      totalProcedures,
      totalAppointments,
      nextAppointments
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Erro ao carregar dashboard" });
  }
};