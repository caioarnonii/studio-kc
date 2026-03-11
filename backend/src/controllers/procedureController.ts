import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const createProcedure = async (req, res) => {
  const { name, price, duration } = req.body;

  const procedure = await prisma.procedure.create({
    data: {
      name,
      price,
      duration
    }
  });

  res.json(procedure);
};

export const getProcedures = async (req, res) => {
  const procedures = await prisma.procedure.findMany();

  res.json(procedures);
};

export const getProcedureById = async (req, res) => {
  const id = Number(req.params.id);

  const procedure = await prisma.procedure.findUnique({
    where: { id },
    include: {
      appointments: true
    }
  });

  res.json(procedure);
};


export const updateProcedure = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, price, duration } = req.body;

    const data: any = {};

    if (name) data.name = name;
    if (price) data.price = Number(price);
    if (duration) data.duration = Number(duration);

    const procedure = await prisma.procedure.update({
      where: { id },
      data
    });

    res.json(procedure);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar procedimento" });
  }
};

export const deleteProcedure = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.procedure.delete({
    where: { id }
  });

  res.json({ message: "Procedure deleted" });
};