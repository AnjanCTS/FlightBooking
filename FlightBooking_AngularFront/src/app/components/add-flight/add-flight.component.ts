import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Scheduleflight } from 'src/app/Models/scheduleFlight.component';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
})
export class AddFlightComponent implements OnInit {
  // public flight={
  //   flightNumber:'',
  //   Airline:'',
  //   srcAirport:'',
  //   dstnAirport:'',
  //   deptDateTime:'',
  //   availableSeats:'',
  //   ticketCost:''
  // }

  flight: Scheduleflight = {
    flightNumber: '',
    Airline: '',
    srcAirport: '',
    dstnAirport: '',
    deptDateTime: '',
    availableSeats: '',
    ticketCost: '',
    enabled:'',
  };

  constructor(private router: Router, private flightService: FlightService) {}

  ngOnInit(): void {}

  TodayDate = new Date().toISOString().substring(0, 10); //"2022-02-02";

  formSubmit(scheduleForm: NgForm) {
    if (!this.buttonFlag) {
      this.flightService.addFlight(this.flight).subscribe({
        next: (data) => {
          Swal.fire(
            'Thank you...',
            'Flight Scheduled successfully!',
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
        },
        complete: () => {
          scheduleForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/addFlight']);
          }, 3000);
        },
        // next: (v) => alert('v'+v),
        // error: (e) => alert('e'+e),
        // complete: () => alert('complete')
      });
    }
  }

  // Flight Number Validations
  flightErrorMsg = '';
  flightNumberFlag: boolean = false;
  validateFlightNumber() {
    if (this.flight.flightNumber.trim().length > 0) {
      var isNumber = /^\d+$/.test(this.flight.flightNumber);
      //var re = /^[0-9]{4}$/.test(this.flight.flightNumber);
      if (isNumber) {
        if( this.flight.flightNumber.trim().length < 4){
        this.flightErrorMsg = 'Flight Number must be at least 4 characters';
        return;
        }
      }
      if (!isNumber) {
        this.flightNumberFlag = true;
        this.flightErrorMsg = 'Invalid Flight Number';
      } else {
        this.flightNumberFlag = false;
      }
    } else {
      this.flightNumberFlag = false;
    }
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
    if (this.flight.flightNumber.trim() == '') {
      this.buttonFlag = true;
      this.flightNumberFlag = true;
      this.flightErrorMsg = 'Enter Flight Number';
      return;
    }
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
      this.flightNumberFlag ||
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
