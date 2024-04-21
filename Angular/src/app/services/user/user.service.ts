import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase = 'https://patient-management.azurewebsites.net/';

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    //return this.http.get<User>(environment.urlApi+"usuario/"+id).pipe(
      return this.http.get<User>(this.urlBase+"v1/api/"+"usuario/"+id).pipe(
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
