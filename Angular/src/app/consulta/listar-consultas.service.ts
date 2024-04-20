import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListarConsultasService {

  constructor(private http:HttpClient) { }
  getConsultas():Observable<any>{
    const token = sessionStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>("v1/api/"+"consultas", {headers}).pipe(
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
