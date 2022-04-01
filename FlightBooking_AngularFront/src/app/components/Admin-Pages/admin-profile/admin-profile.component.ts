import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  public user={
    id:'',
    username:'',
    roles:'',
    name:'',
    email:'',
    phone:'',
    enabled:''
  }
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

}
