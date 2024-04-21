import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common'; // Importa DatePipe

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { PatientDataComponent } from './components/patient-data/patient-data.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegisterComponent } from './components/patient-data/register/register.component';
import { DoctorsComponent } from './components/patient-data/doctors/doctors.component';
import { IndexComponent } from './shared/index/index/index.component';
import { RegisterDoctorComponent } from './components/patient-data/register-doctor/register-doctor.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { ConsultarComponent } from './components/patient-data/consultar/consultar.component';
import { ListarCitasComponent } from './listar-citas/listar-citas/listar-citas.component';
import { ConfirmDialogComponent } from './components/patient-data/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    RegisterDoctorComponent,
    EnumToArrayPipe,
    ConsultarComponent,
    ListarCitasComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    DatePipe // Agrega DatePipe a la lista de proveedores
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }