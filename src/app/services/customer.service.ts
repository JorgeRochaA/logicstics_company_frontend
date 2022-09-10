import { Customer } from './../interfaces/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<Array<Customer>>(`${environment.apiUrl}/customer/get`);
  }
}
