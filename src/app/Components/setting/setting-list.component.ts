import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent implements OnInit {
  pageTitle = 'Settings';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
