import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastComponent } from './components/toast/toast.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, NavbarComponent, ToastComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
