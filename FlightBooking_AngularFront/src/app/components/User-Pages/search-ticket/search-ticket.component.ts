import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {

  displayedColumns: string[] = ['PNR','flightNumber', 'Airline', 'srcAirport','dstnAirport','deptDateTime','Passenger','Fare','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService:BookingService, private router:Router, private auth:AuthService
    ,private dialog : MatDialog) { }

  public ticket = {
    pnr : '',
    mail : '',
  }

  ngOnInit(): void {
  }

  EmialFlag : boolean = false;
  validatePNR(){

    if(this.ticket.pnr.trim().length > 0){
      this.EmialFlag = true;
    }else{
      this.EmialFlag = false;
    }
  }

  PNRFlag : boolean = false;
  validateMail(){
    if(this.ticket.mail.trim().length > 0){
      this.PNRFlag = true;
    }else{
      this.PNRFlag = false;
    }
  }

  detailsFlag: boolean = false;
  NotFoundFlag: boolean = true;
  formSubmit(){
    if(this.ticket.pnr){
    this.bookService.getTicketByPNR(this.ticket.pnr).subscribe({
      next: (res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource.filteredData.length);
        this.dataSource.filteredData.length>0?this.detailsFlag=true:this.NotFoundFlag=false;
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
  }else{
    this.bookService.getTicketByMail(this.ticket.mail).subscribe({
      next: (res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource.filteredData.length);
        this.dataSource.filteredData.length>0?this.detailsFlag=true:this.NotFoundFlag=false;
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
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTicket(userId:number){
    this.bookService.deleteTicket(userId)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }


  reloadData(){
    if(this.ticket.pnr){
      this.bookService.getTicketByPNR(this.ticket.pnr).subscribe({
        next: (res)=>{
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          console.log(this.dataSource.filteredData.length);
          this.dataSource.filteredData.length>0?this.detailsFlag=true:this.NotFoundFlag=false;
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
    }else{
      this.bookService.getTicketByMail(this.ticket.mail).subscribe({
        next: (res)=>{
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          console.log(this.dataSource.filteredData.length);
          this.dataSource.filteredData.length>0?this.detailsFlag=true:this.NotFoundFlag=false;
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
  }






}
