import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Scheduleflight } from 'src/app/Models/scheduleFlight.component';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-update-dialogue',
  templateUrl: './flight-update-dialogue.component.html',
  styleUrls: ['./flight-update-dialogue.component.css']
})
export class FlightUpdateDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  public dialogRef: MatDialogRef<FlightUpdateDialogueComponent>,
  private router: Router, private flightService: FlightService) { }

  flight : Scheduleflight= {
    flightNumber: '',
    Airline: '',
    srcAirport: '',
    dstnAirport: '',
    deptDateTime: '',
    availableSeats: '',
    ticketCost: '',
    enabled:'',
  };

  favoriteSeason = '';
  seasons: string[] = ['Active','InActive'];

  "list": [
    {"name": "Active", ID: "D1", "checked": true},
    {"name": "InActive", ID: "D2", "checked": false}
  ];
  
  isActive : boolean = true;
  public defaultSelected = 0;
  selection = '';
  ngOnInit(): void {
    console.log("ON IN IT FLIGHT UPDATE ");
    console.log(this.editData);
    if(this.editData){
      this.flight.flightNumber = this.editData.flightNumber;
      this.flight.Airline = this.editData.airline;
      this.flight.srcAirport = this.editData.srcAirport;
      this.flight.dstnAirport = this.editData.dstnAirport;
      this.flight.deptDateTime = this.editData.deptDateTime;
      this.flight.availableSeats = this.editData.availableSeats;
      this.flight.ticketCost = this.editData.ticketCost;
      this.flight.enabled = this.editData.enabled;
      if(!this.flight.enabled){
        this.defaultSelected = 1;
      }
      this.selection = this.router.url;
  }
  }

  formSubmit() {
    if (!this.buttonFlag) {
      this.flightService.updateFlight(this.flight).subscribe({
        next: (data) => {
          Swal.fire(
            'Thank you...',
            'Flight Details updated successfully!',
            'success'
          );
        },
        error: (error) => {
          console.log("3"+error.error);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error,
          });
        }
      });
    }
    this.dialogRef.close();
  }

  // Airline Validations
  AirlineErrorMsg = '';
  AirlineFlag: boolean = false;
  validateAirline() {
    if (this.flight.Airline.trim().length > 0) {
      var isNumber = /^\d+$/.test(this.flight.Airline);
      if (isNumber) {
        this.AirlineFlag = true;
        this.AirlineErrorMsg = 'Invalid Airline Name';
      } else {
        this.AirlineFlag = false;
      }
    } else {
      this.AirlineFlag = false;
    }
  }

  // From Validations
  FromErrorMsg = '';
  FromFlag: boolean = false;
  validateFrom() {
    if (this.flight.srcAirport.trim().length > 0) {
      var isNumber = /^\d+$/.test(this.flight.srcAirport);
      if (isNumber) {
        this.FromFlag = true;
        this.FromErrorMsg = 'Invalid Source AirportName';
      } else {
        this.FromFlag = false;
      }
    } else {
      this.FromFlag = false;
    }
  }

  // To Validations
  ToErrorMsg = '';
  ToFlag: boolean = false;
  validateTo() {
    if (this.flight.dstnAirport.trim().length > 0) {
      var isNumber = /^\d+$/.test(this.flight.dstnAirport);
      if (isNumber) {
        this.ToFlag = true;
        this.ToErrorMsg = 'Invalid Destination Airport';
      } else {
        this.ToFlag = false;
      }
    } else {
      this.ToFlag = false;
    }
  }

  //DateValidation
  validateDate() {
    if (this.flight.deptDateTime.trim()=='') {
      this.DateFlag = false;
    } else{
      this.DateFlag = false;
    }
  }

  buttonFlag: boolean = false;
  DateFlag:boolean  = false;
  dateErrorMsg = '';
  validate() {
    if (this.flight.Airline.trim() == '') {
      this.buttonFlag = true;
      this.AirlineFlag = true;
      this.AirlineErrorMsg = 'Enter Airlione Name';
      return;
    }
    if (this.flight.srcAirport.trim() == '') {
      this.buttonFlag = true;
      this.FromFlag = true;
      this.FromErrorMsg = 'Enter Source Airport';
      return;
    }
    if (this.flight.dstnAirport.trim() == '') {
      this.buttonFlag = true;
      this.ToFlag = true;
      this.ToErrorMsg = 'Enter Destination Airport';
      return;
    }
    if (this.flight.deptDateTime.trim() == '') {
      this.buttonFlag = true;
      this.DateFlag = true;
      this.dateErrorMsg = 'Enter Departure Date';
      return;
    }
    // if(this.flight.availableSeats.trim() == ''){
    //   this.buttonFlag=true;
    //   this.PhoneSubmitFlag=true;
    //   return;
    // }
    // if(this.flight.ticketCost.trim() == ''){
    //   this.buttonFlag=true;
    //   this.PhoneSubmitFlag=true;
    //   return;
    // }
    if (
      this.AirlineFlag ||
      this.FromFlag ||
      this.ToFlag
    ) {
      this.buttonFlag = true;
      return;
    }
    this.buttonFlag = false;
  }
}

