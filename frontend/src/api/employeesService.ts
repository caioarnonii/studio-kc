import { api } from './axios';
import type { Employee } from '../types';

export interface EmployeeInput {
  name: string;
  email: string;
  phone: string;
}

export const employeesService = {
  getAll: () => api.get("/users?role=EMPLOYEE"),

  getById: (id: string) => api.get(`/users/${id}`),

  create: (data: EmployeeInput) =>
    api.post("/users", {
      ...data,
      role: "EMPLOYEE"
    }),

  update: (id: string, data: EmployeeInput) =>
    api.put(`/users/${id}`, {
      ...data,
      role: "EMPLOYEE"
    }),

  delete: (id: string) =>
    api.delete(`/users/${id}`)
};