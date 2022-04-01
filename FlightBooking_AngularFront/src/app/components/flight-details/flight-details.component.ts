import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FlightService } from 'src/app/services/flight.service';
import { Scheduleflight } from 'src/app/Models/scheduleFlight.component';
import { MatDialog } from '@angular/material/dialog';
import { FlightUpdateDialogueComponent } from '../update-dialogue/flight-update-dialogue/flight-update-dialogue.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {


  displayedColumns: string[] = ['flightNumber', 'Airline', 'srcAirport','dstnAirport','deptDateTime','availableSeats','ticketCost','enabled','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private flightService:FlightService, private router:Router,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.reloadData();
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

  openDialog(row : any) {
    this.dialog.open(FlightUpdateDialogueComponent, {
      width: '700px',
      height: '500px',
      data : row
    });
    this.dialog.afterAllClosed
    .subscribe({next: (res) => {
      //this.LoginForm.patchValue(this.storage.get("user_data"));
      this.reloadData();
      }
    });
  }
  
  detailsFlag: boolean = false;
  reloadData(){
    this.flightService.getFlightList().subscribe({
      next: (res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.filteredData.length>0?this.detailsFlag=true:this.detailsFlag=false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: (err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: '',
        });
      }
    });  
  }

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
        this.reloadData();
      },
      error => console.log(error));
  }

}
