export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface Procedure {
  id: string;
  name: string;
  price: number;
  duration: number;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  procedureId: string;
  employeeId: string;
  date: string;
  createdAt: string;
  client?: { name: string };
  procedure?: { name: string };
}
