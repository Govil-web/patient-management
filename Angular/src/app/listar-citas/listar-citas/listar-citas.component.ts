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
import { CancelarService } from 'src/app/services/cancelar/cancelar.service';
import { CancelarConsulta } from 'src/app/consulta/cancelar-consultas';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/patient-data/confirm-dialog/confirm-dialog.component';

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
  deleteConsult: CancelarConsulta[] = [];
  totalConsultas: number = 0;
  

  currentPage: number = 1;
  itemsPerPage: number = 10; // Puedes ajustar esto según tus necesidades

  registerForm=this.formBuilder.group({
    id:[''],
    login:['',Validators.required]

  })
  Object: any;


  constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService, 
    private listarConsultaService:ListarConsultasService, private cancelarService: CancelarService, private consultaService: ConsultaService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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

cancelarConsulta(idConsulta: number, motivo: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '250px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Si el usuario confirmó, procede con la cancelación de la consulta
      this.cancelarService.cancelarConsulta({ idConsulta, motivo })
        .subscribe(
          () => {
            // Consulta cancelada exitosamente
            console.log('Consulta cancelada');
            // Actualizar la lista de consultas
            this.actualizarListaConsultas();
            // Mostrar mensaje de éxito
            this.mostrarMensajeExito('Consulta cancelada con éxito');
          },
          (error) => {
            // Manejo de errores
            console.error('Error al cancelar la consulta:', error);
            console.log(idConsulta, motivo);
            this.mostrarMensajeError('Error al cancelar la consulta');
          }
        );
    }
  });
}

mostrarMensajeExito(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000, // Duración del mensaje en milisegundos
    panelClass: ['snackbar-exito'], // Clase CSS para el estilo del mensaje
  });
}

  actualizarListaConsultas() {
    this.listarConsultaService.getConsultas().subscribe(
      (consultasActualizadas) => {
        console.log('datos recuperados: ', JSON.stringify(consultasActualizadas));
        if (consultasActualizadas && Array.isArray(consultasActualizadas)) {
          this.consultas = consultasActualizadas;
        } else {
          console.log('Datos de consultas no válidos recibidos del backend.');
        }
      },
      (error) => {
        console.error('Error al obtener las consultas actualizadas:', error);
        this.mostrarMensajeError('Error al obtener las consultas actualizadas');
      }
    );
  }

  mostrarMensajeError(mensaje: string) {
    console.error(mensaje);
    // Aquí puedes implementar la lógica para mostrar el mensaje de error al usuario
    // Por ejemplo, utilizando un componente de Angular Material o una alerta
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
