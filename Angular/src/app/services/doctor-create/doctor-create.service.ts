import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { DoctorCreate } from './doctor-create';

@Injectable({
  providedIn: 'root'
})
export class DoctorCreateService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  constructor(private http: HttpClient ) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("jwtToken")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("jwtToken") || "");
  }

  createDoctor(body: DoctorCreate): Observable<any>{
    return this.http.post<any>("v1/api/"+"medicos", body).pipe(
      tap((userData) =>{
        sessionStorage.setItem("jwtToken", userData.jwtToken);
        this.currentUserData.next(userData.jwtToken);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.jwtToken),
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
