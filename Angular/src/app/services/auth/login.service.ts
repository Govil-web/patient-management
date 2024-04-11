import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("jwtToken")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("jwtToken") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    //return this.http.post<any>(environment.urlHost+"login", credentials).pipe(  
    return this.http.post<any>("v1/api/"+"login",  credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("jwtToken", userData.jwtToken);
        this.currentUserData.next(userData.jwtToken);
        this.currentUserLoginOn.next(true);
      }),
      map( (userData) => userData.jwtToken),
      catchError(this.handleError)
    );
  }
  logout():void{
    sessionStorage.removeItem("jwtToken");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error:', error);
    }
    else{
      console.error('El backend retorno el codigo de estado:', error);
    }
    return throwError(() => new Error('Algo fallo. Por favor intente de nuevo mas tarde.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
  get userToken():String{
    return this.currentUserData.value;
  }
}
