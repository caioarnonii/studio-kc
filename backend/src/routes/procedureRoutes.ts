import { Router } from "express"
import { prisma } from "../prisma"

const router = Router()

// Criar procedimento
router.post("/", async (req, res) => {
  const { name, price, duration } = req.body

  const procedure = await prisma.procedure.create({
    data: {
      name,
      price,
      duration
    }
  })

  res.json(procedure)
})

// Listar procedimentos
router.get("/", async (req, res) => {
  const procedures = await prisma.procedure.findMany()

  res.json(procedures)
})

// Buscar procedimento por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params

  const procedure = await prisma.procedure.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!procedure) {
    return res.status(404).json({ message: "Procedimento não encontrado" })
  }

  res.json(procedure)
})

// Atualizar procedimento
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name, price, duration } = req.body

  const procedure = await prisma.procedure.update({
    where: {
      id: Number(id)
    },
    data: {
      name,
      price,
      duration
    }
  })

  res.json(procedure)
})

// Deletar procedimento
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  await prisma.procedure.delete({
    where: {
      id: Number(id)
    }
  })

  res.json({ message: "Procedimento deletado" })
})

export default router