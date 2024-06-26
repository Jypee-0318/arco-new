import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CreateformComponent } from '../createform/createform.component';
import { SummaryComponent } from '../summary/summary.component';
import { ProfileComponent } from '../profile/profile.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, CreateformComponent, SummaryComponent, ProfileComponent,FlipbookComponent, ReportComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}