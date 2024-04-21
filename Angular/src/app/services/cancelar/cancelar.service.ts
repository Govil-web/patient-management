import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { CancelarConsulta } from 'src/app/consulta/cancelar-consultas';

@Injectable({
  providedIn: 'root'
})
export class CancelarService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("jwtToken")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("jwtToken") || "");
  }

  cancelarConsulta(body: CancelarConsulta): Observable<any> {
    const url = `v1/api/consultas`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  
    return this.http.delete(url, { headers, body });
  }
  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
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
