import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  TodayDate=new Date().toISOString().substring(0, 10);//"2022-02-02";

  ngOnInit(): void {
  }

  formSubmit(){
    
  }

}
