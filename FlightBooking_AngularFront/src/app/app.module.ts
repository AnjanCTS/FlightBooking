import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AirportDetailsComponent } from './components/airport-details/airport-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { AuthInterceptorProvider } from './services/auth.interceptor';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { AdminSidebarComponent } from './components/Admin-Pages/admin-sidebar/admin-sidebar.component';
import { AdminProfileComponent } from './components/Admin-Pages/admin-profile/admin-profile.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AirportUpdateDialogueComponent } from './components/update-dialogue/airport-update-dialogue/airport-update-dialogue.component';
import { FlightUpdateDialogueComponent } from './components/update-dialogue/flight-update-dialogue/flight-update-dialogue.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { UserProfileComponent } from './components/User-Pages/user-profile/user-profile.component';
import { UserSidebarComponent } from './components/User-Pages/user-sidebar/user-sidebar.component';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFlightComponent } from './components/User-Pages/book-flight/book-flight.component';
import { SearchTicketComponent } from './components/User-Pages/search-ticket/search-ticket.component';
import { HighlightDirective } from './components/home/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent,
    AirportDetailsComponent,
    AdminDashboardComponent,
    AddAirportComponent,
    UserDashboardComponent,
    AdminSidebarComponent,
    AdminProfileComponent,
    AddFlightComponent,
    FlightDetailsComponent,
    AirportUpdateDialogueComponent,
    FlightUpdateDialogueComponent,
    SearchFlightComponent,
    UserProfileComponent,
    UserSidebarComponent,
    BookFlightComponent,
    SearchTicketComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,

  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
