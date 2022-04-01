import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-airport-update-dialogue',
  templateUrl: './airport-update-dialogue.component.html',
  styleUrls: ['./airport-update-dialogue.component.css']
})
export class AirportUpdateDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  public dialogRef: MatDialogRef<AirportUpdateDialogueComponent>,
  private router: Router,private airportService:AirportService) { }

  public airport = {
    airportCode:'',
    airportState:'',
    airportName:''
  }

  ngOnInit(): void {
    if(this.editData){
      this.airport.airportCode = this.editData.airportCode;
      this.airport.airportName = this.editData.airportName;
      this.airport.airportState = this.editData.airportState;
  }
  }

  formSubmit(){

    this.airportService.updateAirport(this.airport).subscribe({
      next: (data) =>{
        Swal.fire('Thank you...', 'Airport detail updated successfully!', 'success')  
      },error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: ''
        })
      },complete: ()=>{
        this.dialogRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/admin/aiportDetails']));
      }
   });

  }

}
