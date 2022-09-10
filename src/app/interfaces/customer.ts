export interface Customer {
  id_customer: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CreateCustomerError {
  email: string;
  id_customer: string;
}
