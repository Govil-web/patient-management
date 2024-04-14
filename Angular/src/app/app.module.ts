import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PatientDataComponent } from './components/patient-data/patient-data.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegisterComponent } from './components/patient-data/register/register.component';
import { DoctorsComponent } from './components/patient-data/doctors/doctors.component';
import { IndexComponent } from './shared/index/index/index.component';
import { RegisterDoctorComponent } from './components/patient-data/register-doctor/register-doctor.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    PatientDataComponent,
    RegisterComponent,
    DoctorsComponent,
    IndexComponent,
    RegisterDoctorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
