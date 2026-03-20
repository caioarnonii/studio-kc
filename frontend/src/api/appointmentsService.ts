import { api } from './axios';
import type { Appointment } from '../types';

export type AppointmentInput = Omit<Appointment, 'id' | 'createdAt' | 'client' | 'procedure'>;

export const appointmentsService = {
  getAll: () => api.get<Appointment[]>('/appointments'),
  getById: (id: string) => api.get<Appointment>(`/appointments/${id}`),
  create: (data: AppointmentInput) => api.post<Appointment>('/appointments', data),
  update: (id: string, data: AppointmentInput) => api.put<Appointment>(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};
