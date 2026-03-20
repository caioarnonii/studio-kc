import { prisma } from "../prisma";

export const createUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password,
      role
    }
  });

  res.json(user);
};

export const getUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } }
      ];
    }

    const users = await prisma.user.findMany({ where });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      appointmentsAsClient: true,
      appointmentsAsEmployee: true
    }
  });

  res.json(user);
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, phone, password, role } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      password,
      role
    }
  });

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: { id }
  });

  res.json({ message: "User deleted" });
};