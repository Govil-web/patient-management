import { Component } from '@angular/core';
import { User } from 'src/app/services/auth/user';
import { Doctor } from 'src/app/services/doctor/Doctor';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { ListarConsulta } from 'src/app/consulta/listar-consulta';
import { ListarConsultasService } from 'src/app/consulta/listar-consultas.service';
import { Paciente } from 'src/app/services/pacient/Paciente';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent {
  errorMessage: string="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;
  consultas:ListarConsulta[] = [];
  

  currentPage: number = 1;
  itemsPerPage: number = 5; // Puedes ajustar esto según tus necesidades

  registerForm=this.formBuilder.group({
    id:[''],
    login:['',Validators.required]

  })
  Object: any;


  constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService, private listarConsultaService:ListarConsultasService) {
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

    this.listarConsultaService.getConsultas().subscribe({
      next:(consultaData)=>{
        console.log('datos recuperados: ', JSON.stringify(consultaData));
        if (consultaData && Array.isArray(consultaData)) {
          this.consultas=consultaData;
        }else{
          console.log('Datos de medicos no válidos recibidos del backend.');
        }
      },
      error: (errorData) =>{
        console.error('error al recuperar datos de medicos: ', errorData);
      }
    });
    
  }




  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    const lastPage = Math.ceil(this.consultas.length / this.itemsPerPage);
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }

  get paginatedConsultas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.consultas.slice(startIndex, endIndex);
  }

  formatDate(data: number[]): Date {
    if (data && data.length === 5) {
      const [year, month, day, hour, minute] = data;
      return new Date(year, month - 1, day, hour, minute); // Los meses en JavaScript van de 0 a 11
    }
    return new Date(); // O cualquier otro valor por defecto que consideres apropiado
  }

}
