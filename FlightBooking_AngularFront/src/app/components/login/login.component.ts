import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
   login = {
    username: '',
    password: '',
  };

  errorMessage = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log("login");
  }

  formSubmit() {
    if (this.buttonFlag) {
      console.log(this.login);
      this.authService.login(this.login).subscribe({
        next:(data)=>{
                 console.log("Sucess");
                 console.log(data.accessToken);

                 this.authService.loginUser(data.accessToken);

                 this.authService.setUser(data);
                console.log(this.authService.getUserRole());
                 if(this.authService.getUserRole()=="ADMIN"){
                   //redirect ADMIN dashboard
                   this.router.navigate(['admin']);
                   this.authService.loginStatusSubject.next(true);
                 }else if(this.authService.getUserRole()=="USER"){
                   //redirect USER dashboard
                  //  window.location.href = '/user-dashboard';
                   this.router.navigate(['user-dashboard']);
                   this.authService.loginStatusSubject.next(true);
                 }else{
                      this.authService.logout();
                 }
        },error:(err)=>{
                 this.errorMessage = err.error.message;
                 console.log("Error");
                 console.log(this.errorMessage);
                 Swal.fire({
                  icon: 'error',
                  title: 'Something went wrong',
                  text: '',
                });
        },complete: ()=>{
            
        }
      });
    }
  }
  
  userNameBlankFlag: boolean = false;
  userNameSizeFlag: boolean = false;
  passwordBlankFlag: boolean = false;
  passwordSizeFlag: boolean = false;
  buttonFlag: boolean = false;

  validate() {
    if (this.login.username.trim() == '') {
      this.userNameBlankFlag = true;
      return;
    } else {
      this.userNameBlankFlag = false;
    }

    if (this.login.password.trim() == '') {
      this.passwordBlankFlag = true;
      return;
    } else {
      this.passwordBlankFlag = false;
    }

    if (this.login.username.trim().length < 3) {
      this.userNameSizeFlag = true;
      return;
    } else {
      this.userNameSizeFlag = false;
    }

    if (this.login.password.trim().length < 6) {
      this.passwordSizeFlag = true;
      return;
    } else {
      this.passwordSizeFlag = false;
    }

    if (
      this.userNameBlankFlag ||
      this.passwordBlankFlag ||
      this.userNameSizeFlag ||
      this.passwordSizeFlag
    ) {
      this.buttonFlag = false;
      return;
    }
    this.buttonFlag = true;
  }
}
