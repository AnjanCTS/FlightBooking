import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  username=null;
  roles=null;

  constructor(private router: Router,public auth:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.username = this.auth.getUser().username;
    this.roles = this.auth.getUserRole();
    this.auth.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.auth.isLoggedIn();
        this.username = this.auth.getUser().username;
      }
    )
  }

  login(){
    this.router.navigate(["login"]);
  }

  home(){
    this.router.navigate([""]);
  }

  public logout(){
    this.auth.logout();
    // window.location.reload();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['login']));
  }

}
