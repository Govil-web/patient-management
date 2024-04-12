import { Component } from '@angular/core';
import { User } from 'src/app/services/auth/user';
import { Doctor } from 'src/app/services/doctor/Doctor';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent {
  errorMessage: string="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;
  doctors:Doctor[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5; // Puedes ajustar esto según tus necesidades

  registerForm=this.formBuilder.group({
    id:[''],
    login:['',Validators.required]

  })
  Object: any;
  constructor(private userService:UserService, private doctorService:DoctorService, private formBuilder:FormBuilder, private loginService:LoginService ){
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

    this.doctorService.getDoctor().subscribe({
      next:(doctorData)=>{
        console.log('datos recuperados: ', JSON.stringify(doctorData));
        if (doctorData && doctorData.content) {
          this.doctors=doctorData.content;
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
    const lastPage = Math.ceil(this.doctors.length / this.itemsPerPage);
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }

  get paginatedDoctors() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.doctors.slice(startIndex, endIndex);
  }

}