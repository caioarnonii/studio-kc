import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import procedureRoutes from "./routes/procedureRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/procedures", procedureRoutes);
app.use("/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API do Studio KC rodando!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});