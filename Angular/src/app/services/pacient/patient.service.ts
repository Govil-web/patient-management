import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from './Paciente';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient, private loginService:LoginService) { }
  getPaciente():Observable<any>{
    //return this.http.get<User>(environment.urlApi+"usuario/"+id).pipe(
      const token = sessionStorage.getItem("jwtToken");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.get<any>("v1/api/"+"pacientes", {headers}).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
