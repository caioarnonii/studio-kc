import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import "dotenv/config"

// 1. Cria o pool de conexão nativo do Postgres
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
})

// 2. Cria o adapter que o Prisma 7 exige
const adapter = new PrismaPg(pool)

// 3. Instancia o cliente passando o adapter
export const prisma = new PrismaClient({ adapter })