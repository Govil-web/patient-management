import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorCreate } from 'src/app/services/doctor-create/doctor-create';
import { DoctorCreateService } from 'src/app/services/doctor-create/doctor-create.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent {

  registerError:string="";

  doctors = this.formBuilder.group({
    nombre: ['',Validators.required],
    email: ['',Validators.required],
    documento: ['',Validators.required],
    telefono: ['',Validators.required],
    especialidad:['',Validators.required],
    direccion: this.formBuilder.group({
      calle: ['',Validators.required],
      distrito: ['',Validators.required],
      ciudad: ['',Validators.required],
      numero: ['',Validators.required],
      complemento: ['',Validators.required],
    }),
  });

  constructor(private formBuilder:FormBuilder, private doctorCreateService: DoctorCreateService, private router:Router  ){}

  create(){
    if (this.doctors.valid) {
      let data = {
        nombre: this.doctors.get('nombre')?.value,
        email: this.doctors.get('email')?.value,
        documento: this.doctors.get('documento')?.value,
        telefono: this.doctors.get('telefono')?.value,
        especialidad: this.doctors.get('especialidad')?.value,
        direccion: {
          calle: this.doctors.get('direccion')?.get('calle')?.value,
          distrito: this.doctors.get('direccion')?.get('distrito')?.value,
          ciudad: this.doctors.get('direccion')?.get('ciudad')?.value,
          numero: this.doctors.get('direccion')?.get('numero')?.value,
          complemento: this.doctors.get('direccion')?.get('complemento')?.value
        }
      };

      this.doctorCreateService.createDoctor(this.doctors.value as DoctorCreate).subscribe({
        next: (userData) =>{
          console.log(userData);
        },
        error: (errorData) => {
          if (errorData.status === 403) {
            // Manejar el error de autorización
            console.error("Acceso prohibido. No tienes permiso para realizar esta acción.");
          } else {
            // Otro tipo de error
            console.error("Ocurrió un error:", errorData);
          }
        },
        complete: () => {
          console.log("Registro completo");
          this.router.navigateByUrl('/doctors');
        }
      });

    }
  }
}
