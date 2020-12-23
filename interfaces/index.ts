export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  sex: string;
  comment: string;
  birthday: string;
  created_at?: string;
  updated_at?: string;
}

export interface Car {
  id: number;
  numbers: string;
  owner_id: number;
  owner?: Client;
  name: string;
  color?: string;
  year?: number;
  miles?: number;
  comment?: string;
  air_condition?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Ticket {
  id: number;
  client_id?: number;
  client?: Client;
  car_id?: number;
  car: Car;
  description?: string;
  charges?: number;
  status?: "Waiting" | "In Progress" | "Completed" | "Cancelled";
  feedback?: string;
  created_at?: string;
  updated_at?: string;

  // Table
  status_value?: string;
}
