import { Customer } from './customer';
import { Status } from './status';

export interface PackageResponse extends Customer, Status {
  id: number;
  details: string;
  weight: number;
  delivery_to: string;
  fk_id_customer: number;
  fk_id_status: number;
  customer: Customer;
  status: Status;
}

export interface UpdatePackage {
  id: number;
  fk_id_status: number;
}

export interface Package {
  details: string;
  weight: number;
  delivery_to: string;
  fk_id_customer: number;
}
