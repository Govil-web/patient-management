import { Component, OnInit } from '@angular/core';
import { PacientCreateService } from 'src/app/services/pacient-create.service';
import { FormBuilder,Validators } from '@angular/forms';
import { PacientCreate } from 'src/app/services/pacient-create';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerError:string="";
  
  registro = this.formBuilder.group({
    nombre: ['',Validators.required],
    email: ['',Validators.required],
    documento: ['',Validators.required],
    telefono: ['',Validators.required],
    direccion: this.formBuilder.group({
      calle: ['',Validators.required],
      distrito: ['',Validators.required],
      ciudad: ['',Validators.required],
      numero: ['',Validators.required],
      complemento: ['',Validators.required],
    }),
  });

  constructor(private patientCreateService:PacientCreateService ,  private router:Router, private formBuilder:FormBuilder ){ }

  onSave() {
    if (this.registro.valid) {
      let data = {
        nombre: this.registro.get('nombre')?.value,
        email: this.registro.get('email')?.value,
        documento: this.registro.get('documento')?.value,
        telefono: this.registro.get('telefono')?.value,
        direccion: {
          calle: this.registro.get('direccion')?.get('calle')?.value,
          distrito: this.registro.get('direccion')?.get('distrito')?.value,
          ciudad: this.registro.get('direccion')?.get('ciudad')?.value,
          numero: this.registro.get('direccion')?.get('numero')?.value,
          complemento: this.registro.get('direccion')?.get('complemento')?.value
        }
      };
  

      this.patientCreateService.savePaciente(this.registro.value as PacientCreate).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          this.registerError = errorData
        },
        complete: () => {
          console.log("Registro completo");
          this.router.navigateByUrl('/inicio');
        }
      })

    }
    else {
      this.registro.markAllAsTouched();
      alert("Error al ingresar el registro");
    }
  }

}
