import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AirportService } from 'src/app/services/airport.service';
import { Airport } from 'src/app/Models/airport.component';
import { MatDialog ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportUpdateDialogueComponent } from '../update-dialogue/airport-update-dialogue/airport-update-dialogue.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {

  airport!: Observable<Airport[]>;

  displayedColumns: string[] = ['airportCode', 'airportState', 'airportName','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private airportService:AirportService, private router:Router,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.reloadData();
  }

  openDialog(row : any) {
    this.dialog.open(AirportUpdateDialogueComponent, {
      width: '30%',
      data : row
    });
  }

  reloadData(){
    this.airportService.getAirportList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
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

  editClick(){
    alert("fff");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(userId:number){
    this.airportService.deleteAirport(userId)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }

  updateUser(userId: number){
    this.router.navigate(['updateAirport',userId])
    .then(() => {
      window.location.reload();
    });
  }
}
