import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private userService:UserService) { }

  public user={
    userName:'',
    password:'',
    name:'',
    email:'',
    phone:''
  }

  public userPass = {
    passwordd:''
  }



  ngOnInit(): void {
  }

  PhoneSubmitFlag: boolean= false;

  formSubmit()
  {
    if(!this.buttonFlag){
     console.log(this.user);
     //adduser: userservice
     this.userService.addUser(this.user).subscribe({
        next: (data) =>{
          Swal.fire('Thank you...', 'You submitted succesfully!', 'success')  
        },error: (error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        },complete: ()=>{
          setTimeout(() => {
            this.router.navigate(["login"]);
        }, 3000);
          
        }
      // next: (v) => alert('v'+v),
      // error: (e) => alert('e'+e),
      // complete: () => alert('complete') 
     });
    //  this.router.navigate(["login"]);

  }
  }

  // Name Validations
  nameFlag: boolean= false;
  validateName() {
    if(this.user.name.trim().length>0){
    var flag =  /^[a-zA-Z ]+$/.test(this.user.name);
    if(!flag) {
      this.buttonFlag = true;
      this.nameFlag=true;
    }
    else {
      this.nameFlag=false;
    }
  }else{
    this.nameFlag=false;
  }
  }

  // UserName Validations
  UserNameFlag: boolean= false;
  validateUserName() {
    if(this.user.userName.trim().length>0){
    let userName=String(this.user.userName);
    if(userName.length < 3) {
      this.buttonFlag = true;
      this.UserNameFlag = true;
    }
    else {
      this.UserNameFlag=false;
    }
  }else{
    this.UserNameFlag=false;
  }
  }

  // Password Validations
  PassFlag: boolean= false;
  validatePassword() {
    if(this.userPass.passwordd.trim().length>0){
      if(this.user.password == this.userPass.passwordd){
       this.PassFlag = false;
      }else{
        this.buttonFlag = true;
       this.PassFlag = true;
      }
    }else{
      this.PassFlag = false;
    }
  }

  // UserPhone valdiations
  phoneFlag:boolean=false;
    validatePhone(){
      this.PhoneSubmitFlag = false;
      if(this.user.phone.trim().length>0){
        let phone=String(this.user.phone);
        var re = /^[0-9]{10}$/.test(this.user.phone);
        if(!re){
          this.buttonFlag = true;
            this.phoneFlag=true;
        }else{
            this.phoneFlag=false;
        }
      }else{
        this.phoneFlag=false;
      }
    }

    //UserEmail Validation
    emailFlag:boolean=false;
    validateEmail(){
      if(this.user.email.trim().length>0){
        var flag=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email);
        if(!flag){
          this.buttonFlag = true;
            this.emailFlag=true;
        }else{
            this.emailFlag=false;
        }
      }else{
        this.emailFlag=false;
      }
    }

  buttonFlag:boolean=false;

    validate(){

      if(this.user.name.trim() == '' || this.user.name == null){
        this.buttonFlag=true;
        this.nameFlag=true;
        return;
     }
     if(this.user.userName.trim() == '' || this.user.userName == null){
      this.buttonFlag=true;
      this.UserNameFlag=true;
      return;
   }
     if(this.user.email.trim() == '' || this.user.email == null){
      this.buttonFlag=true;
      this.emailFlag=true;
      return;
   }
   if(this.user.phone.trim() == '' || this.user.phone == null){
    this.buttonFlag=true;
    this.PhoneSubmitFlag=true;
    return;
 }
 if(this.user.password.trim() == '' || this.user.password == null || this.userPass.passwordd.trim().length<6){
  this.buttonFlag=true;
  return;
}
if(this.nameFlag || this.PassFlag || this.emailFlag || this.UserNameFlag || 
  this.phoneFlag || this.PassFlag){
    this.buttonFlag=true;    
    return;
    }
    this.buttonFlag=false;
  }

}
