import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './components/patient-data/register/register.component';
import { DoctorsComponent } from './components/patient-data/doctors/doctors.component';
import { IndexComponent } from './shared/index/index/index.component';
import { RegisterDoctorComponent } from './components/patient-data/register-doctor/register-doctor.component';
import { ConsultarComponent } from './components/patient-data/consultar/consultar.component';


const routes: Routes = [
  {path:"", redirectTo:"index", pathMatch:"full"},
  {path:"index", component:IndexComponent},
  {path:"inicio", component:DashboardComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"doctors", component:DoctorsComponent},
  {path:"register-doctor", component:RegisterDoctorComponent},
  {path:"consultar", component:ConsultarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
