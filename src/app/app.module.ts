import { GoogleMapsModule } from '@angular/google-maps';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastComponent } from './components/toast/toast.component';
import { DeliveryComponent } from './views/delivery/delivery.component';
import { CreateCustomerComponent } from './views/create-customer/create-customer.component';
import { CreatePackageComponent } from './views/create-package/create-package.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ToastComponent,
    DeliveryComponent,
    CreateCustomerComponent,
    CreatePackageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
