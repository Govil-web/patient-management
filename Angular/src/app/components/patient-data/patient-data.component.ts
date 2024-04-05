import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
import { PatientService } from 'src/app/services/pacient/patient.service';
import { Paciente } from 'src/app/services/pacient/Paciente';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent {
  errorMessage: string="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;
  pacientes:Paciente[] = [];

  registerForm=this.formBuilder.group({
    id:[''],
    login:['',Validators.required]
  })
Object: any;

  constructor(private userService:UserService, private patientService:PatientService , private formBuilder:FormBuilder, private loginService:LoginService  ){
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.login.setValue( userData.login);
      
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
      this.userLoginOn=userLoginOn;
    }
    })

    this.patientService.getPaciente().subscribe({
      next: (pacienteData) =>{
        console.log('datos recuperados: ', JSON.stringify(pacienteData));
        if (pacienteData && pacienteData.content){
          this.pacientes=pacienteData.content;
        }else{
          console.error('Datos de pacientes no válidos recibidos del backend.');
        }
        
        
      },
      error: (errorData ) => {
        console.error('error al recuperar datos de pacientes: ', errorData);
      }
    });
    
  }
}
