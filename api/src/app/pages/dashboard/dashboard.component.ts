import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CreateformComponent } from '../createform/createform.component';
import { SummaryComponent } from '../summary/summary.component';
import { ProfileComponent } from '../profile/profile.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { ReportComponent } from '../report/report.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet,NavbarComponent, CreateformComponent, SummaryComponent, ProfileComponent,FlipbookComponent, ReportComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient){

  }
  
  ngOnInit(): void {
      this.getAllUsers();
  }

  getAllUsers() {
   
    this.http.get('http://localhost/arco/api/get_signup').subscribe((res:any) => {
    this.users = res.data;
  }, _error => {
    alert('Error from API')
  }
    )
  }


  
}
