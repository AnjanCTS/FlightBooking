import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FlightService } from 'src/app/services/flight.service';
import { Scheduleflight } from 'src/app/Models/scheduleFlight.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FlightUpdateDialogueComponent } from '../update-dialogue/flight-update-dialogue/flight-update-dialogue.component';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BookFlightComponent } from '../User-Pages/book-flight/book-flight.component';


@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  displayedColumns: string[] = ['flightNumber', 'Airline', 'srcAirport','dstnAirport','deptDateTime','availableSeats','ticketCost','enabled','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService:FlightService, private router:Router, private auth:AuthService
    ,private dialog : MatDialog) { }

  public search = {
    srcAirport : '',
    dstAirport : '',
    deptDateTime : ''
  }

  TodayDate=new Date().toISOString().substring(0, 10);//"2022-02-02";

  userRole : boolean= false;

  ngOnInit(): void {
    this.auth.getUserRole()=='ADMIN'?this.userRole=false:this.userRole=true;
  }

  flight: Scheduleflight = {
    flightNumber: '',
    Airline: '',
    srcAirport: '',
    dstnAirport: '',
    deptDateTime: '',
    availableSeats: '',
    ticketCost: '',
    enabled:''
  };

  public searchFlight = {
    srcAirport: '',
    dstnAirport: '',
    deptDateTime: '',
  }

  openDialog(row : any) {
    row.srcAirport= row.srcAirport.airportName;
    row.dstnAirport= row.dstnAirport.airportName;

   // this.auth.setSearchFlightDet(this.LoginForm.value);

    this.dialog.open(FlightUpdateDialogueComponent, {
      width: '700px',
      height: '500px',
      data : row
    });
    this.dialog.afterAllClosed
    .subscribe({next: (res) => {
      //this.LoginForm.patchValue(this.storage.get("user_data"));
      this.formSubmit();
      }
    });
  }

  openBookDialog(row : any) {
    row.srcAirport= row.srcAirport.airportName;
    row.dstnAirport= row.dstnAirport.airportName;

   // this.auth.setSearchFlightDet(this.LoginForm.value);

    this.dialog.open(BookFlightComponent, {
      width: '30%',
      data : row
    });
    this.dialog.afterAllClosed
      .subscribe({next: (res) => {
        //this.LoginForm.patchValue(this.storage.get("user_data"));
        this.formSubmit();
        }
      });
  }

  LoginForm!: FormGroup;

  detailsFlag: boolean = false;
  formSubmit(){
    this.flightService.searchFlight(this.searchFlight).subscribe({
      next: (res)=>{
        console.log("INSIDE SEARCH ONLY BRO");
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.filteredData.length>0?this.detailsFlag=true:this.detailsFlag=false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: (error) => {
        console.log("3"+error.error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong',
        });
      }
    });  
  }




  // reloadData(){
  //   this.flightService.getFlightList().subscribe({
  //     next: (res)=>{
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.filteredData.length>0?this.detailsFlag=true:this.detailsFlag=false;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },error: (err)=>{
  //         alert("Error while fetching records");
  //     }
  //   });  
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(userId:number){
    this.flightService.deleteFlight(userId)
    .subscribe(
      data => {
        console.log(data);
        //this.reloadData();
      },
      error => console.log(error));
  }





}
