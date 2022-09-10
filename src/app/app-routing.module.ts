import { AuthGuard } from './guards/auth.guard';
import { CreateCustomerComponent } from './views/create-customer/create-customer.component';
import { CreatePackageComponent } from './views/create-package/create-package.component';
import { DeliveryComponent } from './views/delivery/delivery.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'route', component: DeliveryComponent, canActivate: [AuthGuard] },
  {
    path: 'customer/create',
    component: CreateCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'package/create',
    component: CreatePackageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
