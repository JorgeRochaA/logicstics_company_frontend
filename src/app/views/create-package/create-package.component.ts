import { Router } from '@angular/router';
import { PackageService } from './../../services/package.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from './../../interfaces/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss'],
})
export class CreatePackageComponent implements OnInit {
  customers!: Array<Customer>;
  errorMessage!: string;
  packageForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private customer: CustomerService,
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private router: Router
  ) {
    this.packageForm = this.formBuilder.group({
      details: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.max(100)]],
      delivery_to: ['', [Validators.required]],
      fk_id_customer: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  get formControls() {
    return this.packageForm.controls;
  }

  addPackage(): void {
    this.submitted = true;
    if (this.packageForm.invalid) {
      return;
    }
    this.packageService.addPackage(this.packageForm.value).subscribe({
      next: (data: any) => {
        this.packageForm.reset();
        this.router.navigate(['']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }

  buildFormData(): FormData {
    const formData = new FormData();
    formData.append('details', this.packageForm.get('details')?.value);
    formData.append('weight', this.packageForm.get('weight')?.value);
    formData.append('delivery_to', this.packageForm.get('delivery_to')?.value);
    formData.append(
      'fk_id_customer',
      this.packageForm.get('fk_id_customer')?.value
    );
    return formData;
  }

  getCustomers(): void {
    this.customer.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data.customers;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getLocation(location: string): void {
    this.packageForm.patchValue({
      delivery_to: location,
    });
    this.errorMessage = '';
  }
}
