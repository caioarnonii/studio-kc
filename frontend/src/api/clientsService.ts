import { api } from './axios';
import type { Client } from '../types';

export type ClientInput = Omit<Client, 'id' | 'createdAt'>;

const API_URL = "http://localhost:3000";

export const clientsService = {

  getAll: async () => {
    const res = await fetch(`${API_URL}/users?role=CLIENT`);
    return { data: await res.json() };
  },

  getById: async (id: string) => {
    const res = await fetch(`${API_URL}/users/${id}`);
    return { data: await res.json() };
  },

  create: async (data: any) => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        role: "CLIENT",
        password: "123456" // temporário
      })
    });

    return res.json();
  },

  update: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return res.json();
  },

  delete: async (id: string) => {
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });
  }
};