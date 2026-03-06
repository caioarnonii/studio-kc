import express from "express"
import clientRoutes from "./routes/clientRoutes"
import procedureRoutes from "./routes/procedureRoutes"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Studio KC funcionando 🚀")
})

app.use("/clients", clientRoutes)
app.use("/procedures", procedureRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})