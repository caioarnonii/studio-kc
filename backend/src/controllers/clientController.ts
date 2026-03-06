import { Request, Response } from "express"
import { prisma } from "../prisma"

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, birthDate } = req.body

    const client = await prisma.client.create({
      data: {
        name,
        phone,
        email,
        birthDate: birthDate ? new Date(birthDate) : null
      }
    })

    res.status(201).json(client)

  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cliente" })
  }
}

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany()

    res.json(clients)

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes" })
  }
}