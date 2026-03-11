import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


export const createAppointment = async (req, res) => {
  const { date, notes, clientId, employeeId, procedureId } = req.body;

  const appointment = await prisma.appointment.create({
    data: {
      date: new Date(date),
      notes,

      client: {
        connect: { id: clientId }
      },

      employee: {
        connect: { id: employeeId }
      },

      procedure: {
        connect: { id: procedureId }
      }
    }
  });

  res.json(appointment);
};

export const getAppointments = async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      client: true,
      employee: true,
      procedure: true
    }
  });

  res.json(appointments);
};

export const getAppointmentById = async (req, res) => {
  const id = Number(req.params.id);

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      client: true,
      employee: true,
      procedure: true
    }
  });

  res.json(appointment);
};

export const updateAppointment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { date, status, notes, clientId, employeeId, procedureId } = req.body;

    const data: Prisma.AppointmentUpdateInput = {};

    if (date !== undefined) {
      data.date = new Date(date);
    }

    if (status !== undefined) {
      data.status = status;
    }

    if (notes !== undefined) {
      data.notes = notes;
    }

    if (clientId !== undefined) {
      data.client = {
        connect: { id: Number(clientId) }
      };
    }

    if (employeeId !== undefined) {
      data.employee = {
        connect: { id: Number(employeeId) }
      };
    }

    if (procedureId !== undefined) {
      data.procedure = {
        connect: { id: Number(procedureId) }
      };
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data
    });

    res.json(appointment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
};

export const deleteAppointment = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.appointment.delete({
    where: { id }
  });

  res.json({ message: "Appointment deleted" });
};