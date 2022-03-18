import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.component';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user!: Observable<User[]>;

  displayedColumns: string[] = ['id', 'userName', 'email', 'phone', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData(){
    this.userService.getUserList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: (err)=>{
          alert("Error while fetching records");
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
    this.userService.deleteUser(userId)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }

  updateUser(userId: number){
    this.router.navigate(['updateUser',userId])
    .then(() => {
      window.location.reload();
    });
  }

  userDetails(userId: number){
    this.router.navigate(['userDetails',userId]);
  }

}
