import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messages = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onPatients() {
    this.router.navigate(['/patients']);
  }

  onProviders() {
    this.router.navigate(['/providers']);
  }

  onDaySheet() {
    this.router.navigate(['/daysheet']);
  }

  onMessages() {
    this.router.navigate(['/messages']);
  }

  onReports() {
    this.router.navigate(['/reports']);
  }

  onSetting() {
    this.router.navigate(['/settings']);
  }
}
