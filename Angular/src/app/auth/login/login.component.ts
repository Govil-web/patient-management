import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  
  loginForm=this.formBuilder.group({
    login:['', Validators.required],
    clave: ['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService, private loadingService: LoadingService) { }

  ngOnInit(): void {
  }
  get login(){
    return this.loginForm.controls.login;
  }

  get clave()
  {
    return this.loginForm.controls.clave;
  }

  iniciar(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loadingService.show();

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        } ,
        error: (errorData) => {
          //console.error(errorData);
          this.loginError=errorData;
          this.loadingService.hide();
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
          this.loadingService.hide();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}
