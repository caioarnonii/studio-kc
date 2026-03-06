import { Router } from "express"
import { prisma } from "../prisma"

const router = Router()

// LISTAR CLIENTES
router.get("/", async (req, res) => {
  const clients = await prisma.client.findMany()
  res.json(clients)
})

// BUSCAR CLIENTE POR ID
router.get("/:id", async (req, res) => {
  const { id } = req.params

  const client = await prisma.client.findUnique({
    where: {
      id: Number(id)
    }
  })

  res.json(client)
})

// CRIAR CLIENTE
router.post("/", async (req, res) => {
  const { name, phone, email, birthDate } = req.body

  const client = await prisma.client.create({
    data: {
      name,
      phone,
      email,
      birthDate: new Date(birthDate)
    }
  })

  res.json(client)
})

// ATUALIZAR CLIENTE
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name, phone, email, birthDate } = req.body

  const client = await prisma.client.update({
    where: {
      id: Number(id)
    },
    data: {
      name,
      phone,
      email,
      birthDate: new Date(birthDate)
    }
  })

  res.json(client)
})

// DELETAR CLIENTE
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  await prisma.client.delete({
    where: {
      id: Number(id)
    }
  })

  res.status(204).send()
})

export default router