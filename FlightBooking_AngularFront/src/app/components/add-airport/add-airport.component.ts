import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent implements OnInit {

  public airport = {
    airportCode:'',
    airportState:'',
    airportName:''
  }

  constructor(private router: Router,private airportService:AirportService) { }

  ngOnInit(): void {
  }

  formSubmit(login:NgForm){

    this.airportService.addAirport(this.airport).subscribe({
      next: (data) =>{
        Swal.fire('Thank you...', 'Airport detail added successfully!', 'success')  
      },error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      },complete: ()=>{
        login.reset();
        setTimeout(() => {
          this.router.navigate(["/admin/addAirport"]); 
      }, 3000);
        
      }

    // next: (v) => alert('v'+v),
    // error: (e) => alert('e'+e),
    // complete: () => alert('complete') 
   });

  }

}

