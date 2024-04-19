import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consulta } from 'src/app/services/consulta/Consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { Doctor } from 'src/app/services/doctor/Doctor';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Paciente } from 'src/app/services/pacient/Paciente';
import { PatientService } from 'src/app/services/pacient/patient.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  consulta!: FormGroup;
  mostrarMensajeError = false;
  mostrarMensajeExito = false; 
  mensajeError: string = '';

  constructor(
    private pacienteService: PatientService,
    private doctorService: DoctorService,
    private consultaService: ConsultaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerDoctores();

    this.consulta = this.formBuilder.group({
      paciente: ['', Validators.required],
      especialidad: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  obtenerPacientes() {
    this.pacienteService.getPaciente().subscribe(
      (response) => {
        if (response && response.content) {
          this.pacientes = response.content;
          console.log('Lista de pacientes:', this.pacientes);
        } else {
          console.error('La respuesta del servicio no tiene la estructura esperada:', response);
        }
      },
      (error) => {
        console.error('Error al obtener la lista de pacientes:', error);
      }
    );
  }

  obtenerDoctores() {
    this.doctorService.getDoctor().subscribe(
      (response) => {
        if (response && response.content) {
          this.doctores = response.content;
          console.log('Lista de doctores: ', this.doctores);
        } else {
          console.error('La respuesta del servicio no tiene la estructura esperada:', response);
        }
      },
      (error) => {
        console.error('Error al obtener la lista de doctores:', error);
      }
    );
  }

  create() {
    if (this.consulta.valid) {
      const fechaSeleccionada = new Date(this.consulta.get('startDate')?.value);
      const horaSeleccionada = fechaSeleccionada.getHours();
  
      if (fechaSeleccionada.getDay() >= 1 && fechaSeleccionada.getDay() <= 6 && horaSeleccionada >= 7 && horaSeleccionada < 19) {
        const fecha = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-ddTHH:mm:ss') || '';
        const idPaciente = this.consulta.get('paciente')?.value;
        const especialidad = this.consulta.get('especialidad')?.value;
  
        this.consultaService.verificarConsultaExistente(idPaciente, fecha).subscribe({
          next: (response) => {
            if (response.existe) {
              this.mensajeError = 'El paciente ya tiene una consulta para ese día';
              this.mostrarMensajeError = true;
            } else {
              const data: Consulta = {
                idPaciente: idPaciente,
                especialidad: especialidad,
                fecha: fecha
              };
  
              this.consultaService.postConsultar(data).subscribe({
                next: (response) => {
                  console.log('Respuesta exitosa:', response);
                  this.mostrarMensajeExito = true;
                },
                error: (error: any) => {
                  console.error('Error del backend:', error);
                  if (error.status === 400 && error.error) {
                    console.error('Errores de validación:', error.error);
                  } else {
                    console.error('Otro tipo de error:', error);
                  }
                },
                complete: () => {
                  console.log('Solicitud completada');
                }
              });
            }
          },
          error: (error: any) => {
            console.error('Error al verificar la consulta:', error);
          }
        });
      } else {
        this.mensajeError = 'El horario de atención de la clínica es de lunes a sábado de 07:00 a 19:00 horas';
        this.mostrarMensajeError = true;
      }
    }
  }
}

