import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-daysheet',
  templateUrl: './daysheet.component.html',
  styleUrls: ['./daysheet.component.scss']
})
export class DaysheetComponent implements OnInit {
  pageTitle = 'Daysheet';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
