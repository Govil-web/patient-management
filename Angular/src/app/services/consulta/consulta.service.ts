
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Consulta } from './Consulta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");


  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("jwtToken")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("jwtToken") || "");
  }

  postConsultar(body: Consulta): Observable<any> {
    //return this.http.post<any>("v1/api/consultas", body).pipe(
      return this.http.post<any>(environment.urlHost+"consultas", body).pipe(
      tap((userData) => {
        sessionStorage.setItem("jwtToken", userData.jwtToken);
        this.currentUserData.next(userData.jwtToken);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.jwtToken),
      catchError(this.handleError)
    );
  }

  verificarConsultaExistente(idPaciente: string, fecha: string): Observable<any> {
    // Aquí debes implementar la lógica para verificar si existe una consulta para el paciente en la fecha seleccionada
    // Puedes hacer una solicitud HTTP al servidor para realizar esta verificación
    // Por ahora, simplemente retornaremos un observable que emita un valor booleano
    return new Observable<boolean>((observer) => {
      // Simulamos una respuesta exitosa indicando que no existe una consulta para el paciente en la fecha seleccionada
      setTimeout(() => {
        observer.next(false);
        observer.complete();
      }, 1000);
    });
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
