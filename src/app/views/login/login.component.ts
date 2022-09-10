import { Toast } from 'src/app/interfaces/toast';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted: boolean = false;
  toastData: Toast = {
    title: '',
    message: '',
  };
  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  buildFormData(): FormData {
    const formData = new FormData();
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    return formData;
  }

  login(): void {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    const formData = this.buildFormData();
    this.user.login(formData).subscribe({
      next: (data) => {
        this.user.setUser(data);
        this.router.navigate(['/']);
      },
      error: (errorResponse) => {
        let { error } = errorResponse.error;
        this.loginForm.reset();
        this.toastData = {
          title: 'Error',
          message: error,
        };
        setTimeout(() => {
          this.clearToast();
        }, 2000);
      },
    });
  }

  clearToast(): void {
    this.toastData = {
      title: '',
      message: '',
    };
  }
}
