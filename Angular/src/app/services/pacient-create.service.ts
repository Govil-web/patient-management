import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './auth/login.service';
import { Observable, catchError, tap, throwError, BehaviorSubject, map } from 'rxjs';
import { PacientCreate } from './pacient-create';

@Injectable({
  providedIn: 'root'
})
export class PacientCreateService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("jwtToken")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("jwtToken") || "");
  }

  savePaciente(body: PacientCreate): Observable<any> {
    return this.http.post<any>("v1/api/"+"pacientes", body).pipe(
      tap( (userData) =>{
        sessionStorage.setItem("jwtToken", userData.jwtToken);
        this.currentUserData.next(userData.jwtToken);
        this.currentUserLoginOn.next(true);
      }),
      map( (userData) => userData.jwtToken),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error: ', error.error);
    } else {
      console.error('El backend ha retornado el código de estado: ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}