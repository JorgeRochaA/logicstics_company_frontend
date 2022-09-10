import { CreateCustomerError } from './../../interfaces/customer';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  errors: CreateCustomerError = {
    email: '',
    id_customer: '',
  };
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customer: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      id_customer: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.customerForm.controls;
  }

  buildFormData(): FormData {
    const formData = new FormData();
    formData.append('id_customer', this.customerForm.get('id_customer')?.value);
    formData.append('name', this.customerForm.get('name')?.value);
    formData.append('last_name', this.customerForm.get('last_name')?.value);
    formData.append('phone', this.customerForm.get('phone')?.value);
    formData.append('email', this.customerForm.get('email')?.value);
    return formData;
  }

  createCustomer(): void {
    this.submitted = true;
    if (!this.customerForm.valid) {
      return;
    }
    const formData = this.buildFormData();
    this.customer.createCustomer(formData).subscribe({
      next: (data) => {
        this.customerForm.reset();
        this.router.navigate(['/package/create']);
      },
      error: (errorResponse) => {
        this.errors = errorResponse.error.errors;
      },
    });
  }
}
