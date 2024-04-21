import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paciente } from './Paciente';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private urlBase = 'https://patient-management.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  getPaciente(): Observable<any> {
    const token = sessionStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>(this.urlBase +"v1/api/pacientes", { headers }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
