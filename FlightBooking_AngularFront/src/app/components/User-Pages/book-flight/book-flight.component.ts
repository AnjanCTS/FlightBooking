import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Scheduleflight } from 'src/app/Models/scheduleFlight.component';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  public dialogRef: MatDialogRef<BookFlightComponent>,
  private router: Router, private bookService: BookingService,private auth: AuthService) { }

  public book = {
    noOfPassenger: '',
    alternateMail:'',
    bookClass:'',
  };


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

  ngOnInit(): void {
   
   if(this.editData){
    this.flight.flightNumber = this.editData.flightNumber;
    this.flight.Airline = this.editData.airline;
    this.flight.srcAirport = this.editData.srcAirport;
    this.flight.dstnAirport = this.editData.dstnAirport;
    this.flight.deptDateTime = this.editData.deptDateTime;
    this.flight.availableSeats = this.editData.availableSeats;
    this.flight.ticketCost = this.editData.ticketCost;
    this.flight.enabled = this.editData.enabled;
  }

  console.log(this.flight);
}

  buttonFlag:boolean=false;
  formSubmit() {
    if (!this.buttonFlag) {
      this.bookService.bookFlight(this.book,this.auth.getUser().username,this.editData.flightNumber).subscribe({
        next: (data) => {
          Swal.fire(
            'Thank you...',
            'Ticket Booked successfully!',
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
  passengerErrorMsg = '';
  passengerFlag: boolean = false;
  validatePassenger() {
    if (this.book.noOfPassenger.trim().length > 0) {
      var isNumber = /^\d+$/.test(this.book.noOfPassenger);
      if (isNumber) {
        this.passengerFlag = true;
        this.passengerErrorMsg = 'Invalid Airline Name';
      } else {
        this.passengerFlag = false;
      }
    } else {
      this.passengerFlag = false;
    }
  }

  //UserEmail Validation
  emailFlag:boolean=false;
  FromErrorMsg = '';
  validateMail(){
    if(this.book.alternateMail.trim().length>0){
      var flag=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.book.alternateMail);
      if(!flag){
        this.buttonFlag = true;
          this.emailFlag=true;
          this.FromErrorMsg = 'Invalid Airline Name';
      }else{
          this.emailFlag=false;
      }
    }else{
      this.emailFlag=false;
    }
  }

  validate() {
    if (this.book.noOfPassenger.trim() == '') {
      this.buttonFlag = true;
      this.passengerFlag = true;
      this.passengerErrorMsg = 'Enter Passenger number';
      return;
    }
    if (this.book.alternateMail.trim() == '') {
      this.buttonFlag = true;
      this.emailFlag = true;
      this.FromErrorMsg = 'Enter Email';
      return;
    }
    if (
      this.passengerFlag ||
      this.emailFlag
    ) {
      this.buttonFlag = true;
      return;
    }
    this.buttonFlag = false;
  }
}
