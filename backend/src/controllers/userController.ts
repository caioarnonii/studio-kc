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
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true
    }
  });

  res.json(users);
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