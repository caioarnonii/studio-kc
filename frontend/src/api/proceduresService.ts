import { api } from './axios';
import type { Procedure } from '../types';

export type ProcedureInput = Omit<Procedure, 'id' | 'createdAt'>;

export const proceduresService = {
  getAll: () => api.get<Procedure[]>('/procedures'),
  getById: (id: string) => api.get<Procedure>(`/procedures/${id}`),
  create: (data: ProcedureInput) => api.post<Procedure>('/procedures', data),
  update: (id: string, data: ProcedureInput) => api.put<Procedure>(`/procedures/${id}`, data),
  delete: (id: string) => api.delete(`/procedures/${id}`),
};
