import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AirportDetailsComponent } from './components/airport-details/airport-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { AdminProfileComponent } from './components/Admin-Pages/admin-profile/admin-profile.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { SearchTicketComponent } from './components/User-Pages/search-ticket/search-ticket.component';


const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch: 'full'},
  {path:'register',component:RegisterComponent,pathMatch: 'full'},
  {path:'login',component:LoginComponent,pathMatch: 'full'},
  {path:'footer',component:FooterComponent,pathMatch: 'full'},
  {path:'userDetails',component:UserDetailsComponent,pathMatch: 'full'},
  {path:'admin',component:AdminDashboardComponent,
  children:[
          {
            path:'',
            component: AdminProfileComponent,
          },
          {
            path:'addAirport',
            component: AddAirportComponent,
          },
          {
            path:'aiportDetails',
            component: AirportDetailsComponent,
          },
          {
            path:'addFlight',
            component: AddFlightComponent,
          },
          {
            path:'flightDetails',
            component: FlightDetailsComponent,
          },
          {
            path:'flightSearch',
            component: SearchFlightComponent,
          }
  ],canActivate:[AdminGuard]},
  {path:'user-dashboard',component:UserDashboardComponent,
  children:[
    {
      path:'',
      component: AdminProfileComponent,
    },
    {
      path:'flightSearch',
      component: SearchFlightComponent,
    },
    {
      path:'ticketSearch',
      component: SearchTicketComponent,
    }
],canActivate:[UserGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
